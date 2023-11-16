const User = require('../models/user.model');
const catchAsync =require('../utils/catchAsync')
const bycrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const { ref, getDownloadURL } = require('firebase/storage');
const storage = require('../utils/firebase');


//const validUser =require('../middlewares/user.middleware')


 
//? Find All Users
exports.findAllUsers = catchAsync(async (req, res,next) => {
  
    const users = await User.findAll({
      where: {
        status: 'active',
      },
    });

    const usersPromises = users.map(async (user) => {
      //Obtenemod la referencia
      const imgRef = ref(storage, user.profileImgUrl);
      //traemos la url
      const url = await getDownloadURL(imgRef);
      //hacemos el cambio del path por la url
      user.profileImgUrl =url;
      //retornamos el usuario
      return user;
    });

    //throw new Error ('Error simulated in find all users')
    const userResolved = await Promise.all(usersPromises);

    res.status(200).json({
      status: 'success',
      numUsers: users.length,
      users: userResolved,
    });

});

//? Find One User
exports.findOneUser = catchAsync(async (req, res,next) => {

    const { id } = req.params;
    const { user } = req;
    
    const imgRef = ref(storage,user.profileImgUrl); 
    const url = await getDownloadURL(imgRef);
    //console.log(url);  
 
    res.status(200).json({
      status: 'success',
      message: `User with ${id} found`,
      user:{
        name:user.name,
        email:user.email,
        description: user.description,
        profileImgUrl: url, 
        role:user.role,
      },
    });
});

//?Create User
exports.createUser = catchAsync(async (req, res, next) => {

  const { name, email,password,description } = req.body;
  
  //Encriptación de contaseña

  const salt = await bycrypt.genSalt(12);
  const hashPassword = await bycrypt.hash(password, salt);

  const comment =await User.create({ name, email, password, description })

  return res.status(201).json(
    {
      status: 'success',
      message: 'User created successfully',
      comment,
    }
  )
});

//? Update User
exports.updateUser = catchAsync(async (req, res,next) => {

    const { user } = req;
    const { id } = req.params;
    const { name, description } = req.body;
    
    await user.update({ name, description });

    return res.status(200).json({
      status: 'success',
      user,
    });
});

//? Delete User
exports.deleteUser = catchAsync(async (req, res,next) => {
  
    const { id } = req.params;

    const { user } = req;

    await user.update({ status: 'inactive' });

    return res.status(200).json({
      status: 'success',
      message: `User with id=${id} deleted successfully`,
    });
 
});

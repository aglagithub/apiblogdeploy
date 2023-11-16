const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { promisify } = require('util')
require('dotenv').config();

//proteccion de rutas
exports.protect = catchAsync(async (req, res, next) => {
  //console.log(req.headers.authorization);
  // 1. Extract taken from header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  //2. validar si el token existe
  if (!token) {
    return next(new AppError('you are not logged in!, Please log in to ger access!', 401)
    )
  };

  //3. Decodificar el token jwt
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT_SEED)

  //console.log("token decoded: ",decoded);

  //4. Buscar el usuario y validar si existe
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'active',
    }
  })
  if (!user) {
    return next(new AppError('The owner of this token is no longer available', 401)
    );
  }

  //5. validar el tiempo en el que se cambi+o la contraseña, para saber si el token generado fue generado después del cambio de contraseña
  if (user.passwordChangeAt) {
    const changedTimeStamp = parseInt(
      user.passwordChangeAt.getTime() / 1000, 10
    )

    //console.log(decoded.iat)
    //console.log(changedTimeStamp);
    if (decoded.iat < changedTimeStamp) {
      return next(new AppError('User recently changed password! please login again', 401))

    }
  }

  //6. Adjuntar el usuario en session (***)

  req.sessionUser = user;
  next();

});

//Proteccion de la cuenta de usuario
exports.protectAccountOwmer = (req, res, next) => {
  const { user, sessionUser } = req;
  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401))
  }
  next();
};

//verificación de rol
exports.restricTo = (...roles)=>{

return (req,res,next) =>{
//console.log(roles);
if(!roles.includes(req.sessionUser.role)){
  return new(AppError('You do not have permission to perform this action.',403))
}
next();
}
}



const catchAsync = require('../utils/catchAsync');

const { db } = require('./../database/config');
const { Post, postStatus } = require('../models/post.model');
const User = require('../models/user.model');
const Comment = require('../models/comment.model');
const PostImg = require('../models/postImg.model');
const storage = require('../utils/firebase');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const crypto = require('node:crypto');

//? Traer todos los posts
exports.findAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.findAll({
    where: {
      status: postStatus.active,
    },
    attributes: {
      exclude: ['status', 'usedId'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'profileImgUrl', 'description'],
      },
      {
        model: PostImg,
      },
      //   {
      //     model: Comment,
      //     attributes: {
      //       exclude: ['status', 'postId', 'userId'],
      //     },
      //     include: [
      //       {
      //         model: User,
      //         attributes: ['id', 'name', 'profileImgUrl', 'description'],
      //       },
      //     ],
      //   },
    ],
    order: [['createdAt', 'DESC']],
    limit: 10,
  });

  //recorrido por todos los posts
  const postPromises = posts.map(async (post) => {
    const imgRefUser = ref(storage, post.user.profileImgUrl);
    const urlUser = await getDownloadURL(imgRefUser);
    post.user.profileImgUrl = urlUser;

    //recorrido por PostImages de cada post
    const postImgsPromises = post.PostImgs.map(async (postImg) => {
      const imgRef = ref(storage, postImg.postImgUrl);
      const url = await getDownloadURL(imgRef);
      postImg.postImgUrl = url; //coloca la url de la imagen en firebase
      return postImg;
    });

    const postImgsResolved = await Promise.all(postImgsPromises); // resolución de las promesas pendientes
    post.PostImgs = postImgsResolved; // se reeemplaza el  arregla antiguo con el nuevo con url actualizadas de las imagenes

    return post;
  });

  await Promise.all(postPromises); // Resuleve la promesa más externa

  //En este punto todas las url de las imagenes están resuleltas
  return res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

//? Funcionalidad para traer los posts de usuario en sesion.
//Incluye comentarios de cada post y usuario que hizo comentario
exports.findMyPosts = catchAsync(async (req, res, next) => {
  //implentación
  const { id } = req.sessionUser;

  const posts = await Post.findAll({
    where: {
      status: postStatus.active,
      userId: id,
    },
    include: [
      //   {
      //     model: Comment,
      //     attributes: {
      //       exclude: ['status', 'postId', 'userId'],
      //     },
      //     include: [
      //       {
      //         model: User,
      //         attributes: ['id', 'name', 'profileImgUrl', 'description'],
      //       },
      //     ],
      //   },
      { model: PostImg },
    ],
  });

  //Colocacion sorrecta de la url de la imagen
  if (posts.length > 0) {
    const postPromises = posts.map(async (post) => {
      const postImgsPromises = post.PostImgs.map(async (postImg) => {
        const imgRef = ref(storage, postImg.postImgUrl);
        const url = await getDownloadURL(imgRef);

        postImg.postImgUrl = url; // coloca la url correcta
        return postImg;
      });

      const postImgsResolved = await Promise.all(postImgsPromises);
      post.PostImgs = postImgsResolved; //Coloca la url real de las imagenes
      return post;
    });

    await Promise.all(postPromises); //resuelve todas las promesas pendientes
  }

  return res.status(200).json({
    status: 'success',
    results: posts.length,
    posts,
  });
});

//? Funcionalidad para encontar los posts de un usuario
exports.findUserPosts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {status} = req.query;

  //Esto está mal, es vulnerable a SQL injection, CORREGIR!
  /*   const query = `SELECT * FROM posts WHERE "userId" = ${id} AND status = 'active'`; */

  //const query = `SELECT id, title,content, "createdAt","updatedAt" FROM posts WHERE "userId" = ${id} AND status = ${status}`;

  //Solución: usar variables que reemplacen los literales
const query = `SELECT id, title,content, "createdAt","updatedAt" FROM posts WHERE "userId" = :iduser AND status = :status`;

  //console.log("query in finderUserPosts: posts: ",query)
  const [rows, fields] = await db.query(query,{
    replacements:{ideuser:id, status:status},
  });
 
  //console.log("rows in finderUserPosts: posts: ", rows)
  //console.log("field in finderUserPosts: posts: ", fields)

  return res.status(200).json({
    status: 'success',
    results: fields.rowCount,
    posts: rows,
  });
});

//? Create post
exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  const { id: userId } = req.sessionUser;

  const post = await Post.create({ title, content, userId });

  //console.log('files included in Post: ',req.files);

  const postImgsPromises = req.files.map(async (file) => {
    const imgRef = ref(
      storage,
      `posts/${crypto.randomUUID()}-${file.originalname}`
    );
    const imgUploaded = await uploadBytes(imgRef, file.buffer);
    return await PostImg.create({
      postId: post.id,
      postImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  await Promise.all(postImgsPromises);

  return res.status(201).json({
    status: 'success',
    message: 'The post has been created',
    post,
  });
});

//? Traer todos un post por id
exports.findOnePost = catchAsync(async (req, res, next) => {
  const { post } = req;
  let postImgsPromises = [];
  let userImgsCommentPromises = [];
  //obtener url de la imagen del perfil del usuario
  imgRefUserProfile = ref(storage, post.user.profileImgUrl);
  const urlUserProfile = await getDownloadURL(imgRefUserProfile);
  post.user.profileImgUrl = urlUserProfile;

  //obtener las url de las imagenes en los posts
  if (post.PostImgs.length > 0) {
    const postImgsPromises = post.PostImgs.map(async (postImg) => {
      const imgRef = ref(storage, postImg.postImgUrl);
      const url = await getDownloadURL(imgRef);
      postImg.postImgUrl = url;
      return postImg;
    });
    await Promise.all(postImgsPromises);
  }

  // obtener url de la imagen en el comentario

  return res.status(200).json({
    status: 'success',
    post,
  });
});

//? Update post
exports.updatePost = catchAsync(async (req, res, next) => {
  const { post } = req;
  const { title, content } = req.body;

  await post.update({ title, content });
  return res.status(200).json({
    status: 'success',
    message: 'The post has been updated',
    post,
  });
});

//? Delete post
exports.deletePost = catchAsync(async (req, res, next) => {
  const { post } = req;

  await post.update({ status: postStatus.disabled });

  return res.status(200).json({
    status: 'success',
    message: 'The post has been deleted',
  });
});

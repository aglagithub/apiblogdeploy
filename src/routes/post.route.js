const express = require('express');

//controllers
const postController = require('../controllers/post.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware')
const postMiddleware = require('./../middlewares/post.middleware')
const userMiddleware = require('./../middlewares/user.middleware')
const upload = require('./../utils/multer') ;


const router = express.Router();

router
  .route('/')
  .get(postController.findAllPosts)
  .post(
    upload.array('postImgs',3), //? al utilizar el upload de multer, se me permite tener acceso a req.files
    authMiddleware.protect,
    validationMiddleware.createPostValidation,
    postController.createPost);

router.use(authMiddleware.protect)  //protege las rutas subsiguientes
router.get('/me',postController.findMyPosts) //solo los post del logeado
router.get('/profile/:id', userMiddleware.validUser, postController.findUserPosts)

router
  .route('/:id')
  .get(
    postMiddleware.validPostPerFindOne,postController.findOnePost)
  .patch(
    postMiddleware.validPost,
    validationMiddleware.createPostValidation,authMiddleware.protectAccountOwmer, postController.updatePost
    )
  .delete(
    postMiddleware.validPost,
    authMiddleware.protectAccountOwmer, postController.deletePost
    );
 
module.exports = router;

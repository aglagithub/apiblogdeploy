const express = require('express');

//controllers
const postController = require('../controllers/post.controller');

//middlewares
const authMiddleware = require('./../middlewares/auth.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const postMiddleware = require('./../middlewares/post.middleware');

const router = express.Router();

router
  .route('/')
  .get(postController.findAllPosts)
  .post(
    authMiddleware.protect,
    validationMiddleware.createPostValidation,
    postController.createPost
  );

router.use(authMiddleware.protect);

router
  .use('/:id', postMiddleware.validPost)
  .route('/:id')
  .get(postController.findOnePost)
  .patch(validationMiddleware.createPostValidation, postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;

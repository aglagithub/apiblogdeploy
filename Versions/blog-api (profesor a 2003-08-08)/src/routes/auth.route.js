const express = require('express');

//controllers
const authController = require('./../controllers/auth.controller');

//middlewares
const validationMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const upload = require('./../utils/multer');

const router = express.Router();

router.post(
  '/signup',
  upload.single('profileImgUrl'), //?al utilizar el upload de multer, me va a permitir tener acceso a la req.file
  validationMiddleware.createUserValidation,
  authController.signUp
);

router.post(
  '/signin',
  validationMiddleware.loginUserValidation,
  authController.signIn
);

router.use(authMiddleware.protect);

router.patch(
  '/password/:id',
  validationMiddleware.updatePasswordValidation,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwner,
  authController.updatePassword
);

module.exports = router;

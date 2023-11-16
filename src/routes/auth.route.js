const express = require('express');
console.log('auth.route.js:', 'Hello from route');

//controllers
const authController = require('../controllers/auth.controller');
const protectAccountOwmer = require('../middlewares/auth.middleware')

//middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware')

const upload  = require ('./../utils/multer')

//Routes
const router = express.Router();

router.post(
  '/signup',
  upload.single('profileImgUrl'),
  validationMiddleware.createUserValidation,
  authController.signUp
);

router.post(
  '/signin',
  validationMiddleware.loginUserValidaton,
  authController.signIn
);

router.use(authMiddleware.protect); //proteccion de rutas de aqui en adelante

router.patch(
  '/password/:id',
  validationMiddleware.updatePasswordValidation,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwmer,
  authController.updatePassword
);

module.exports = router;

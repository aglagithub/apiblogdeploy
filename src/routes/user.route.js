const express = require('express');

const userController = require('./../controllers/user.controller');

//Middlewares
const userMiddleware = require('./../middlewares/user.middleware')
const validationMiddleware = require('./../middlewares/validations.middleware')
const authMiddleware =require('./../middlewares/auth.middleware')

const router = express.Router();

router.use(authMiddleware.protect) //proteccion de rutas de aqui en adelante

router.get('/', userController.findAllUsers);
router.post('/', authMiddleware.protect, validationMiddleware.createUserValidation,userController.createUser);

//router.use('/:id', userMiddleware.validUser)
//router.use(authMiddleware.restricTo('admin','user'));

router
    .use('/:id', userMiddleware.validUser)
    .route('/:id')
    .get(userController.findOneUser)
    .patch(validationMiddleware.updateUserValidation,userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router; 

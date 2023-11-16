const AppError = require('../utils/appError');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync')

// Middleware para ejecutar parter de código en requests
exports.validUser = catchAsync(async (req, res, next) => {
    //1. traer el id de la req.params, este es el id del usuario
    const { id } = req.params;
    //2. buscar el usuario con status active y el id recibido
    const user = await User.findOne({
        where: {
            id,
            status: 'active',
        },
    });

    //3. Valido que si no existe , envio el error
    if (!user) {
        return next(new AppError(`User with ${id} not found`, 404));
    }

    //4. Adjunto que si no esiste, envío error
    req.user = user;
    next();

});

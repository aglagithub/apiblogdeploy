
const AppError = require('./../utils/appError')
const Error = require('../models/error.model')

//funciones manejadoras de error
const handleCastError22001 = () => {
    return new AppError('The number of charecters is grater than expected', 400)
}
const handleCastError22P02 = () => {
    return new AppError('Invelid data type in database', 400)
}
const handleCastError23505 = () => {
    return new AppError('Duplicate fild value: Please use another value.', 400)
}


const handleJWTError = () => {
    return new AppError('Invalid Token. Please Login Again', 401)
}
const handleJWTExpiredError = () => {
    return new AppError('Your token has expired!, Please Login Again', 401)
}
//funciones mahejadoras de error.end
const sendErrorDev = async(err, res) => {
    await Error.create({
        status: err.status,
        message:err.message,
        stack:err.stack,

    });
    console.log(err);
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err: err,
    });
}

const sendErrorProd = (err, res) => {
     
    console.log(err)
    if (err.isOperational) {
        // operacional, trusted error : send message to the client
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })

    } else {
        // programming or other unknown: don´t leak error detail
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong!',
        })

    }

}
const globalErrorHandler = (err, req, res, next) => {
    //solo entran errores 400, de lo contrario se coloca 500
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    if (process.env.NODE_ENV === 'production') {
        // manejo errores en produccción
        let error = err;
        if (err.parent?.code === '22001') error = handleCastError22001();
        if (err.parent?.code === '22P02') error = handleCastError22P02();
        if (err.parent?.code === '23505') error = handleCastError23505();
        if (err.name === 'JsonWebTokenError') error = handleJWTError();
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();


        sendErrorProd(error, res);

    }

};

module.exports = globalErrorHandler;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
        this.isOperational = true;

        //console.log('En AppError.')
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError
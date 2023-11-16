const express = require('express');
const cors = require('cors');
//const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const sanitizer = require('perfect-express-sanitizer');


//console.log(process.env.NODE_ENV);

//console.log("Hello from app.js")
//console.log('process:', process )
//console.log('process.env', process.env)

// routes
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');

//Manejo de errores
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

//Limitador de peticiones para protección. 5 peticiones en 60 mintuos
const limiter = rateLimit({
  max: 10000, // maxi0 10000 peticiones..
  windowMs: 60 * 60 * 1000, //en 60 minutos
  message: 'Too many request from this IP, please try again in an hour!',
});

//middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());

app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    sql: false, //obligatoriamente debe ir en false
  })
); 


if (process.env.NODE_ENV === 'development') {
 // app.use(morgan('dev'));
}

app.use('api/v1',limiter);
//routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);

//captura de rutas inexistentes
app.all('*', (req, res, next) => {
  //     return res.status(400).json({
  //     status: 'error',
  //       message: `Can´t find ${req.originalUrl} on This server!`,
  //   });

  //const err = new Error(`!Can´t find ${req.originalUrl} on This server!`)
  //err.status = 'error'
  //err.statusCode = 404;

  //Propagación del mesaje de error a las siguietes etapas
  //next(err);

  return next(
    new AppError(`!Can´t find ${req.originalUrl} on This server!`, 404)
  );
});

//Middleware para manejo centralizado de errores
app.use(globalErrorHandler);

module.exports = app;

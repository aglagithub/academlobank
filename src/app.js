const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

//console.log("Hello from app.js")
//console.log(process.env.NODE_ENV);
//console.log('process:', process )
//console.log('process.env', process.env)


// routes:
const userRoutes = require('./routes/user.route')
const transferRoutes = require('./routes/transfer.route');
//pend: const AppError = require('./utils/appError');
//pend: const globalErrorHandler = require('./controllers/error.controller');

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routes:
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/transfers', transferRoutes)

//captura de rutas inexistentes
app.all('*', (req, res, next) => {
    return res.status(400).json({
    status: 'error',
      message: `!Can´t find ${req.originalUrl} on This server!`,
  });

const err = new Error(`!Can´t find ${req.originalUrl} on This server!`)
err.status = 'error'
err.statusCode = 404;

  //Propagación del mesaje de error a las siguietes etapas
next(err);

//return next(new AppError(`!Can´t find ${req.originalUrl} on This server!`, 404));
return next();
});

//Middleware para manejo centralizado de errores
//pend:
//app.use(globalErrorHandler)

module.exports = app;

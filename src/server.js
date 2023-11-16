require('dotenv').config();
const initModel =require('./models/initModels')

//console.log("Hello from server.js blog app")
const app = require('./app');
const { db } = require('./database/config');
const {Server} = require('socket.io');

//cron example
const cron =require('node-cron');
const Sockets = require('./sockets');
/* cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});
 */

//Autenticación en la base de datos
db.authenticate()
  .then(() => {
    console.log('Database Connected ...😊');
  })
  .catch((error) => {
    console.log('Error when authenticating to db. ☠️ ');
  });

  // inicializacion de las relaciones del modelo
  initModel();

//Sincronización con la base de datos
db.sync()
  .then(() => {
    console.log('Database Synchronized...😀');
  })
  .catch((error) => {
    console.log('Error sychronizing to db. ☠️');
  });

const PORT = process.env.PORT || 3200;

//Start listening
const server = app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

const io = new Server(server,{
  cors :{
    origin:'*', // Origenes permitidos
    methods:['GET','POST'],
    }
})
 
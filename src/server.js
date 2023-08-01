require('dotenv').config();

//console.log("Hello from server.js AcademloBank app")
const app = require('./app');
const { db } = require('./database/config');

//Autenticación en la base de datos
db.authenticate()
  .then(() => {
    console.log('Database Connected ...😊');
  })
  .catch((error) => {
    console.log('Error when authenticating to db. ☠️ ');
  });

//Sincronización con la base de datos
db.sync()
  .then(() => {
    console.log('Database Synchronized...😀');
  })
  .catch((error) => {
    console.log('Error sychronizing to db. ☠️');
  });

//Start server

const PORT = process.env.PORT || 3200;

//Start listening
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

import express from 'express';
import App from './services/expressApp';
import dbConnection from './services/database';

const StartServer = async () => {
  const app = express();

  // call database connection function
  await dbConnection();

  await App(app);

  app.listen(7000, () => {
    console.log("listening on Port 7000");


  });
}

StartServer(); 
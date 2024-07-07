import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { AdminRoute, VandorRoute } from '../routes';

export default async (app: Application) => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); // use this because we deal with multi-part file 

  app.use('/images', express.static('/images'));

  app.use('/admin', AdminRoute);
  app.use('/vandor', VandorRoute);

  return app;
}



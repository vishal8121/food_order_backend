import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


import { AdminRoute, VandorRoute } from './routes';
import { MONGO_URI } from './config/index';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // use this because we deal with multi-part file 

app.use('/admin', AdminRoute);
app.use('/vandor', VandorRoute);


mongoose.connect(MONGO_URI,).then(result => {
  console.log("connection established")
    ;
}).catch(err => {
  console.log("error:" + err);
})

const PORT = 7000;

app.listen(PORT, () => {
  console.log('App is listening on port ' + PORT);
});
import express, { Request, Response, NextFunction } from 'express';
import { GetVandorProfile, VandorLogin, UpdateVandorProfile, UpdateVandorService, AddFood, GetFoods } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer';
import { UpdateVandorCoverImage } from './../controllers/VandorController';


const router = express.Router();


const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
  }
});

const images = multer({
  storage: imageStorage
}).array('images', 10);


router.post('/login', VandorLogin);



router.use(Authenticate)
router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/coverImage', images, UpdateVandorCoverImage);
router.patch('/service', UpdateVandorService);

router.post('/food', images, AddFood);
router.get('/foods', GetFoods);

export { router as VandorRoute };
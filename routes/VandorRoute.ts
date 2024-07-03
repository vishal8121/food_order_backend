import express, { Request, Response, NextFunction } from 'express';
import { GetVandorProfile, VandorLogin, UpdateVandorProfile, UpdateVandorService } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();
router.use(Authenticate)
router.post('/login', VandorLogin);
router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service', UpdateVandorService);

export { router as VandorRoute };
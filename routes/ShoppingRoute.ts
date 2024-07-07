import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();



/** ------------------------------- Food Availability ----------------------------------**/

router.get('/:pincode');

/** ------------------------------- Top Restaurants  ----------------------------------**/

router.get('/top-restaurants/:pincode');

/** ------------------------------- Food Available in 30 Minutes ----------------------------------**/

router.get('/food-in-30-min/:pincode');

/** ------------------------------- Search Food ----------------------------------**/

router.get('/search/:pincode');

/** ------------------------------- Find Restaurants by Id ----------------------------------**/

router.get('/restaurants/:id');








export { router as ShoppingRouter };
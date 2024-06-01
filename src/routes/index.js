const express = require('express');
const routerUser = require('./user.router');
const hotelRouter = require('./hotel.router');
const routerCity = require('./city.router');
const routerImage = require('./image.router');
const routerReview = require('./review.router');
const routerBooking = require('./booking.router');
const router = express.Router();

// colocar las rutas aquí
router.use(routerUser);
router.use(hotelRouter);
router.use(routerCity);
router.use(routerImage);
router.use(routerReview);
router.use(routerBooking);


module.exports = router;
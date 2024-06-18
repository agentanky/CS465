const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'payload'
});

// Middleware to log headers and payload
router.use((req, res, next) => {
  next();
});

router
  .route('/login')
  .post(authController.login);

router
  .route('/register')
  .post(authController.register);

router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(auth, (req, res, next) => {
    next();
  }, tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(auth, (req, res, next) => {
    next();
  }, tripsController.tripsUpdateTrip);

module.exports = router;

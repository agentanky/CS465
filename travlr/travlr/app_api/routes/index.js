const express = require('express')
const router = express.Router()

const tripsController = require('../controllers/trips')

// get all trips
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip)
  // Get method tripsFindByCode - requires parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)



  module.exports = router;
const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// Get Trips
const tripsList = async (req, res) => {
  try {
    const q = await Trip.find({}).exec();
    if (!q) {
      return res.status(404).json({ message: 'No trips found' });
    } else {
      return res.status(200).json(q);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const q = await Trip.find({ 'code': req.params.tripCode }).exec();
    if (!q) {
      return res.status(404).json({ message: 'Trip not found' });
    } else {
      return res.status(200).json(q);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = new Trip({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: `assets/images/${req.body.image.replace(/^.*[\\/]/, '')}`, // Ensure correct path
      description: req.body.description
    });
    const q = await newTrip.save();
    return res.status(201).json(q);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip
};

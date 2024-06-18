const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const User = require('../models/user');

const tripsAddTrip = async (req, res) => {
  try {
    const user = await getUser(req);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newTrip = new Trip(req.body);
    const trip = await newTrip.save();
    return res.status(201).json(trip);
  } catch (err) {
    console.log('Error in tripsAddTrip:', err);
    return res.status(500).json({ message: "Error adding trip", error: err });
  }
};

const getUser = async (req) => {
  try {
    if (req.payload && req.payload._id) {
      const user = await User.findById(req.payload._id).select('name email').exec();
      if (!user) {
        return null;
      }
      return user;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

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

const tripsUpdateTrip = async (req, res) => {
  try {
    const user = await getUser(req);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const trip = await Trip.findOneAndUpdate({ code: req.params.tripCode }, req.body, { new: true });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: "Error updating trip", error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  getUser
};

const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const User = require('../models/user');

const tripsAddTrip = async (req, res) => {
  try {
    console.log('Payload in tripsAddTrip:', req.payload);
    const user = await getUser(req);
    console.log('User in tripsAddTrip callback:', user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Add trip logic here
    return res.status(200).json({ message: "User found", user });
  } catch (err) {
    console.log('Error in tripsAddTrip:', err);
    return res.status(500).json({ message: "Error adding trip", error: err });
  }
};

const getUser = async (req) => {
  try {
    console.log('Payload in getUser:', req.payload);
    if (req.payload && req.payload._id) {
      console.log('User ID in JWT:', req.payload._id);
      const user = await User.findById(req.payload._id).select('name email').exec();
      if (!user) {
        console.log("User not found");
        return null;
      }
      console.log("User found:", user);
      return user;
    } else {
      console.log('No userId in request');
      return null;
    }
  } catch (err) {
    console.log("Error finding user:", err);
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
    console.log('Payload in tripsUpdateTrip:', req.payload);
    const user = await getUser(req);
    console.log('User in tripsUpdateTrip callback:', user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update trip logic here
    return res.status(200).json({ message: "User found", user });
  } catch (err) {
    console.log('Error in tripsUpdateTrip:', err);
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

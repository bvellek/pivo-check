const mongoose = require('mongoose');

const checkoffSchema = new mongoose.Schema({
  breweryID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  cityID: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    max: 3,
    default: 0,
  },
  completionStatus: {
    type: Boolean,
    default: false,
  },
});

const Checkoff = mongoose.model('Checkoff', checkoffSchema);

module.exports = Checkoff;

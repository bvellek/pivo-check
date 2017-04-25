const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  cityCoords: {
    lat: {
      type: Number,
      required: true,
      trim: true,
    },
    lng: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  userID: {
    type: String,
    required: true,
  },
  brewTotal: Number,
  created: {
    type: Date,
    default: Date.now,
  },
});

const City = mongoose.model('City', citySchema);

module.exports = City;

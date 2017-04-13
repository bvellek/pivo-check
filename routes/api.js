const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Checkoff = require('../models/checkoff');
const User = require('../models/user');

mongoose.Promise = global.Promise;

const router = new express.Router();


router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: 'Your\'re authorized to see this secret message.',
  });
});

// BreweryDB API proxy
router.post('/city', (req, res) => {
  const coords = req.body.coords;
  console.log('**', req.body);
  const lat = coords.lat;
  const lng = coords.lng;
  const api = `https://api.brewerydb.com/v2/search/geo/point?lat=${lat}8&lng=${lng}&key=c97314af1e304cd0ad2f0d5e2cff7c18`;
  fetch(api).then((response) => (
    response.json()
  )).then((results) => {
    res.status(200).json(results);
  }).catch(() => {
    res.status(500).json({ error: 'could not get city brewery data' });
  });
});

module.exports = router;
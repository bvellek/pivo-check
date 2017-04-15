const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Checkoff = require('../models/checkoff');
const User = require('../models/user');
require('isomorphic-fetch');

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
  // console.log('Coords', req.body);
  const lat = coords.lat;
  const lng = coords.lng;
  const api = `https://api.brewerydb.com/v2/search/geo/point?lat=${lat}8&lng=${lng}&key=c97314af1e304cd0ad2f0d5e2cff7c18`;
  fetch(api).then((response) => (
    response.json()
  ))
  .then((rawResults) => {
    if (rawResults.totalResults >= 1) {
      const brewArr = rawResults.data;
      const publicBreweries = brewArr.filter((i) => (i.openToPublic === 'y' || i.openToPublic === 'Y'));
      return publicBreweries;
    }
    function BrewError(message) {
      this.name = 'brewError';
      this.message = message || 'Brew Error';
      this.stack = (new Error()).stack;
    }
    BrewError.prototype = Object.create(Error.prototype);
    BrewError.prototype.constructor = BrewError;
    throw new BrewError('There are no breweries here.');
  })
  .then((publicBreweries) => {
    const openBreweries = publicBreweries.filter((i) => (i.isClosed === 'n' || i.isClosed === 'N'));
    return openBreweries;
  })
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    if (err.name === 'brewError') {
      res.status(202).json(err.message);
    } else {
      res.status(500).json(err.message);
    }
  });
});

module.exports = router;

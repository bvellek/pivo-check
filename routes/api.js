const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const City = require('../models/city');
const bodyParser = require('body-parser');
const Checkoff = require('../models/checkoff');

require('isomorphic-fetch');

mongoose.Promise = global.Promise;

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: 'Your\'re authorized to see this secret message.',
  });
});

// Get User's Cities Array
router.get('/cities/:userID', (req, res) => {
  console.log(req.params.userID);
  // Checkoff
  //   .create({
  //     userID: req.params.userID,
  //     breweryID: 'qlT9u4',
  //     cityID: '58fab22cd5edf3240233d275',
  //     completionStatus: false,
  //     rating: 1,
  //   });
  City
    .find({
      userID: req.params.userID,
    })
    .exec((err, cities) => {
      console.log('##');
      const cityPromises = cities.map((city) => {
        console.log('###', city);
        return getCompletedByCityID(city.id)
          .then((completedCount) => {
            console.log('####', completedCount);
            const cityWithCount = Object.assign({ completedCount }, { city });
            console.log(cityWithCount);
            return cityWithCount;
          });
      });
      Promise.all(cityPromises).then((citiesWithCount) => {
        console.log(citiesWithCount);
        res.status(200).json(citiesWithCount);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Could not get cities.',
      });
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


// Functions
function getCompletedByCityID(cityID) {
  return new Promise((res, rej) => {
    Checkoff
      .find({ cityID, completionStatus: true })
      .exec((err, results) => {
        console.log('%%%');
        if (err) {
          rej(err);
        } else {
          const count = results.length;
          console.log('$$$', count);
          res(count);
        }
      });
  });
}

module.exports = router;

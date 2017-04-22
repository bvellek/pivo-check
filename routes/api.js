const express = require('express');
const mongoose = require('mongoose');
// const User = require('../models/user');
const City = require('../models/city');
const bodyParser = require('body-parser');
const Checkoff = require('../models/checkoff');

require('isomorphic-fetch');

mongoose.Promise = global.Promise;

const router = new express.Router();

// Get User's Cities with completed count
const getCities = (req, res) => {
  City
    .find({ userID: req.params.userID })
    .exec((err, cities) => {
      const cityPromises = cities.map((city) => (
        getCompletedByCityID(city.id)
          .then((completedCount) => {
            const cityWithCount = Object.assign({ completedCount }, { city });
            return cityWithCount;
          })
      ));
      Promise.all(cityPromises).then((citiesWithCount) => {
        res.status(200).json(citiesWithCount);
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Could not get cities.',
      });
    });
};

router.get('/cities/:userID', getCities);

// Add User City receive: userID, city string, coords
router.post('/cities', (req, res) => {
  const user = req.body.userID;
  const coords = req.body.coords;
  const lat = coords.lat;
  const lng = coords.lng;
  const cityString = req.body.cityName;

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
    const breweries = results;
    return breweries.length;
  })
  .then((brewCount) => {
    console.log(brewCount);
    City
      .create({
        userID: user,
        cityName: cityString,
        cityCoords: {
          lat,
          lng,
        },
        brewTotal: brewCount,
      })
      .exec()
      .then(res.status(201).json(`Successfully added ${cityString}`));
  })
  .catch((err) => {
    if (err.name === 'brewError') {
      res.status(202).json(err.message);
    } else {
      res.status(500).json(err.message);
    }
  });
});

// Delete a user city - removes city and all related checkoff documents
const deleteCity = (req, res) => {
  const cityID = req.params.cityID;
  return new Promise((resolve, reject) => {
    Checkoff
      .find({ cityID })
      .remove()
      .exec((err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
  })
  .then(() => {
    City
      .findById(cityID)
      .remove()
      .exec();
  }).then(() => {
    res.status(200).json({ message: `${cityID} removed.` });
  }).catch(err => (res.status(500).json(err)));
};

router.delete('/cities/:cityID', deleteCity);

// BreweryDB API proxy
const getBreweryData = (req, res) => {
  const coords = req.body.coords;
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
};

router.post('/city', getBreweryData);


// Functions
function getCompletedByCityID(cityID) {
  return new Promise((res, rej) => {
    Checkoff
      .find({ cityID, completionStatus: true })
      .exec((err, results) => {
        if (err) {
          rej(err);
        } else {
          const count = results.length;
          res(count);
        }
      });
  });
}

module.exports = router;

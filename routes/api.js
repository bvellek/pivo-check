const express = require('express');
const mongoose = require('mongoose');
// const User = require('../models/user');
const City = require('../models/city');
const bodyParser = require('body-parser');
const Checkoff = require('../models/checkoff');

require('isomorphic-fetch');

mongoose.Promise = global.Promise;

const router = new express.Router();

// Delete a user city - removes city and all related checkoff documents
const deleteCity = (req, res) => {
  const cityToDelete = req.params.cityID;
  return new Promise((resolve, reject) => {
    Checkoff
      .find({ 'cityID': cityToDelete }) // eslint-disable-line
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
      .findById(cityToDelete)
      .remove()
      .exec();
  }).then(() => {
    res.status(200).json({ message: `${cityToDelete} removed.` });
  }).catch(err => (res.status(500).json(err)));
};

router.delete('/cities/:cityID', deleteCity);

// Functions
const getCities = (req, res) => {
  City
    .find({ userID: req.params.userID })
    .exec((err, cities) => {
      const cityPromises = cities.map((city) => (
        getCompletedByCityID(city.id)
          .then((completedCount) => {
            const cityWithCount = Object.assign({}, { completedCount }, {
              _id: city._id,
              userID: city.userID,
              cityName: city.cityName,
              brewTotal: city.brewTotal,
              cityCoords: {
                lat: city.cityCoords.lat,
                lng: city.cityCoords.lng,
              },
            });
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

const getCompletedByCityID = (cityID) => (
  new Promise((res, rej) => {
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
  })
);

const getBreweries = (lat, lng) => {
  const api = `https://api.brewerydb.com/v2/search/geo/point?lat=${lat}8&lng=${lng}&key=c97314af1e304cd0ad2f0d5e2cff7c18`;
  return fetch(api).then((response) => (
    response.json()
  ))
  .then((rawResults) => {
    if (rawResults.totalResults) {
      const brewArr = rawResults.data;
      const publicBreweries = brewArr.filter((i) => (i.openToPublic === 'y' || i.openToPublic === 'Y'));
      return publicBreweries;
    }
    return [];
    // function BrewError(message) {
    //   this.name = 'brewError';
    //   this.message = message || 'Brew Error';
    //   this.stack = (new Error()).stack;
    // }
    // BrewError.prototype = Object.create(Error.prototype);
    // BrewError.prototype.constructor = BrewError;
    // throw new BrewError('There are no breweries here.');
  })
  .then((publicBreweries) => {
    if (publicBreweries >= 1) {
      const openBreweries = publicBreweries.filter((i) => (i.isClosed === 'n' || i.isClosed === 'N'));
      return openBreweries;
    }
    return publicBreweries;
  });
};

// Get User's Cities with completed count
router.get('/cities/:userID', getCities);

// Add User City receive: userID, city string, coords
router.post('/cities', async (req, res) => {
  const user = req.body.userID;
  const coords = req.body.coords;
  const lat = coords.lat;
  const lng = coords.lng;
  const cityString = req.body.cityName;

  await getBreweries(lat, lng)
    .then((results) => {
      const breweries = results;
      return breweries.length;
    })
  .then((brewCount) => {
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
      .then(res.status(201).json(`Successfully added ${cityString}`));
  })
  .catch((err) => {
    // if (err.name === 'brewError') {
    //   res.status(202).json(err.message);
    // } else {
    res.status(500).json(err.message);
    // }
  });
});

// BreweryDB API proxy
router.post('/city', async (req, res) => {
  const coords = req.body.coords;
  const lat = coords.lat;
  const lng = coords.lng;

  await getBreweries(lat, lng)
  .then((results) => {
    res.status(200).json(results);
  })
  .catch((err) => {
    // if (err.name === 'brewError') {
    //   res.status(202).json(err.message);
    // } else {
    res.status(500).json(err.message);
    // }
  });
});

module.exports = router;

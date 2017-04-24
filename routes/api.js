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
      .exec()
      .then(() => {
        res.status(200).json({ message: `${cityToDelete} removed.` });
      });
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

// Get User's Cities with completed count
router.get('/cities/:userID', getCities);

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

const getBreweries = (lat, lng) => new Promise((resolve, reject) => {
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
  })
  .then((publicBreweries) => {
    if (publicBreweries >= 1) {
      const openBreweries = publicBreweries.filter((i) => (i.isClosed === 'n' || i.isClosed === 'N'));
      return resolve(openBreweries);
    }
    return resolve(publicBreweries);
  })
  .catch((err) => {
    console.log(err);
    reject(err);
  });
});

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
    res.status(500).json(err.message);
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
    res.status(500).json(err.message);
  });
});

// Get City - breweries list
router.get('/city/:cityID', async (req, res) => {
  const cityToGet = req.params.cityID;
  let cityName;
  console.log('!', cityToGet);
  await getCityData(cityToGet)
  .then((results) => {
    console.log('@@@@@@@@@@@@@@@@@@@');
    const lat = results.cityCoords.lat;
    const lng = results.cityCoords.lng;
    cityName = results.cityName;
    getBreweries(lat, lng)
    .then((breweries) => {
      console.log('&&&&&&&&&&&&&&&&');
      return mapBreweryToCheckoff(breweries, cityToGet);
    })
      .then((breweriesWithCheck) => {
        console.log('@@@', breweriesWithCheck);
        res.status(200).json({
          cityID: cityToGet,
          cityName,
          brewArr: breweriesWithCheck,
        });
      });
  })
  .catch((err) => {
    console.log(`couln't get breweries: ${err}`);
    res.status(500).json(err.message);
  });
});

const mapBreweryToCheckoff = (breweryArr, cityID) => new Promise((resolve, reject) => {
  console.log('%%%%%%%%%%%%%%%%%%%%%%%', cityID);
  const breweryPromises = breweryArr.map((brewery) => {
    console.log('0000000000000000000');
    return getCheckoffByBreweryAndCity(brewery.id, cityID)
    .then((checkoffInfo) => {
      console.log('~~~~~~~~~~~~~~~~~~~~~~', checkoffInfo);
      const breweryWithCheckoff = Object.assign({ checkoffInfo }, brewery);
      console.log('$$$$$$$$$$$$$$$$');
      return breweryWithCheckoff;
    });
  });
  Promise.all(breweryPromises).then((breweriesWithCheckoff) => {
    console.log('AHHHHHHHHHHHHHHHHHHHH', breweriesWithCheckoff);
    return resolve(breweriesWithCheckoff);
  })
  .catch(err => {
    console.log(err);
    reject(err);
  });
});

const getCheckoffByBreweryAndCity = (breweryID, cityID) => (
  new Promise((resolve, reject) => {
    console.log('9999999999999999999');
    let checkoffInfo;
    return Checkoff
      .find({ cityID, breweryID })
      .exec((err, results) => {
        if (err) {
          console.log('err');
          reject([]);
        } else {
          console.log('888888888888888888', results);
          if (results.length === 0) {
            checkoffInfo = {};
          } else {
            const rating = results[0].rating;
            const completionStatus = results[0].completionStatus;
            checkoffInfo = {
              rating,
              completionStatus,
            };
          }
          resolve(checkoffInfo);
        }
      });
  })
);

const getCityData = (cityID) => (
  City
    .findById(cityID)
    .exec()
    .then(results => {
      console.log('@', results);
      return results;
    })
    .catch(err => (
      console.log(err)
    ))
);

// Checkoff/Rate Brewery - breweryID, userID, cityID, check value
// router.post('/city', (req, res) => {

// });

module.exports = router;

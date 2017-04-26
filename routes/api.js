const express = require('express');
const mongoose = require('mongoose');
const City = require('../models/city');
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
              created: city.created,
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

// Get City - breweries list
router.get('/city/:cityID', async (req, res) => {
  const cityToGet = req.params.cityID;
  let cityName;
  await getCityData(cityToGet)
  .then((results) => {
    const lat = results.cityCoords.lat;
    const lng = results.cityCoords.lng;
    cityName = results.cityName;
    getBreweries(lat, lng)
    .then((breweries) => (
      mapBreweryToCheckoff(breweries, cityToGet)
    ))
    .then((breweriesWithCheck) => {
      const newBrewCount = breweriesWithCheck.length;
      updateBreweryTotal(cityToGet, newBrewCount);
      return breweriesWithCheck;
    })
      .then((breweriesWithCheck) => {
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
  const breweryPromises = breweryArr.map((brewery) => {
    return getCheckoffByBreweryAndCity(brewery.id, cityID)
    .then((checkoffInfo) => {
      const breweryWithCheckoff = Object.assign({ checkoffInfo }, brewery);
      return breweryWithCheckoff;
    });
  });
  Promise.all(breweryPromises).then((breweriesWithCheckoff) => (
    resolve(breweriesWithCheckoff)
  ))
  .catch(err => {
    console.log(err);
    reject(err);
  });
});

const getCheckoffByBreweryAndCity = (breweryID, cityID) => (
  new Promise((resolve, reject) => {
    let checkoffInfo;
    return Checkoff
      .find({ cityID, breweryID })
      .exec((err, results) => {
        if (err) {
          console.log('err');
          reject([]);
        } else {
          if (results.length === 0) {
            checkoffInfo = {
              completionStatus: false,
              rating: 0,
            };
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
    .then(results => (
      results
    ))
    .catch(err => (
      console.log(err)
    ))
);

const updateBreweryTotal = (cityID, newBrewTotal) => (
  new Promise((resolve, reject) => {
    City
      .findByIdAndUpdate(cityID, { $set: { brewTotal: newBrewTotal } }, { new: true })
      .exec()
      .then(updatedBrew => resolve(updatedBrew))
      .catch(err => reject(err));
  })
);

// Checkoff/Rate Brewery - breweryID, userID, cityID, check value/rating value
router.post('/city', (req, res) => {
  const userID = req.body.userID;
  const breweryID = req.body.breweryID;
  const cityID = req.body.cityID;
  const updated = {};
  const updateableFields = ['rating', 'completionStatus'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });
  let checkoffID;
  Checkoff
    .findOne({
      cityID,
      breweryID,
      userID,
    }, (err, checkoff) => {
      if (err) {
        res.status(500).json('error searching for checkoff');
      }
      if (checkoff) {
        checkoffID = checkoff._id;
        Checkoff
          .findByIdAndUpdate(checkoffID, {
            $set: updated,
          }, { new: true })
          .exec()
          .then(() => res.status(200).json(`${checkoffID} was successfully updated!`));
      } else {
        Checkoff
          .create(Object.assign({}, updated, {
            userID,
            breweryID,
            cityID,
          }))
          .then((newCheckoff) => (res.status(201).json(`${newCheckoff._id} was successfully created!`)))
          .catch(error => {
            res.status(500).json(error.message);
          });
      }
    });
});

module.exports = router;

import 'isomorphic-fetch';


// Loading Element
export const LOADING_STATUS_TRUE = 'LOADING_STATUS_TRUE';
export const loadingStatusTrue = () => ({
  type: LOADING_STATUS_TRUE,
});


// Register User
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const registerUserSuccess = (registrationSuccessMessage) => ({
  type: REGISTER_USER_SUCCESS,
  registrationSuccessMessage,
});

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const registerUserError = (registrationErrorMessage) => ({
  type: REGISTER_USER_ERROR,
  registrationErrorMessage,
});

export const registerUser = user => dispatch => {
  dispatch(loadingStatusTrue());
  const registrationEndpoint = '/auth/registration';
  const userData = user;
  return fetch(registrationEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ userData }),
  }).then((response) => {
    if (response.status === 200) {
      // success
      console.log('the form is valid!');
      return response.json()
        .then((successResponse) => (
          dispatch(registerUserSuccess(successResponse))
        ));
    } return response.json()
      // failure
        .then((errorResponse) => {
          const errors = errorResponse.errors ? errorResponse.errors : {};
          errors.summary = errorResponse.message;
          dispatch(registerUserError(errors));
        });
  });
};

// export const fetchSunTimes = coords => dispatch => {
//   const url = 'https://lumen-spot.herokuapp.com/location'; // server requires absolute address
//   const coordinates = coords;
//   return fetch(url, {
//     method: 'POST',
//     headers: {
//      Accept: 'application/json',
//      'Content-type': 'application/json'
//    },
//     body: JSON.stringify({ coords: coordinates })
//   }).then((response) => {
//     if (response.status < 200 || response.status >= 300) {
//       const error = new Error(response.statusText);
//       error.response = response;
//       throw error;
//     }
//     return response.json();
//   }).then((response) => (
//     response
//   )).then((results) => (
//     dispatch(
//       fetchSunTimesSuccess(results)
//     )
//   ))
//   .catch((error) => (
//     dispatch(
//       fetchSunTimesError(error)
//     )
//   ));
// };




// // Search Location to Lat/Long


// export const fetchLocationCoords = searchQuery => dispatch => {
//   dispatch(coordsLoadingStatusTrue());
//   const address = searchQuery;
//   return new Promise((res, rej) => {
//     const geocoder = new google.maps.Geocoder(); // eslint-disable-line
//     geocoder.geocode({ address }, (results, status) => {
//         if (status === 'OK') {
//           const lat = results[0].geometry.location.lat();
//           const long = results[0].geometry.location.lng();
//           const coords = `${lat},${long}`;
//           res(coords);
//         } else {
//           const error = 'Sorry! We could not geocode your location.';
//           rej(error);
//         }
//     });
//   }).then((coords) => {
//     dispatch(
//       fetchLocationCoordsSuccess(coords)
//     );
//     dispatch(
//       fetchSunTimes(coords)
//     );
//     dispatch(
//       fetchWeather(coords)
//     );
//     dispatch(
//       fetchInspiration(coords)
//     );
//     return coords;
//   }).catch((error) => (
//     dispatch(
//       fetchLocationCoordsError(error)
//     )
//   ));
// };


// // Find Current Location
// export const GET_CURRENT_LOCATION_SUCCESS = 'GET_CURRENT_LOCATION_SUCCESS';
// export const getCurrentLocationSuccess = (coords) => ({
//   type: GET_CURRENT_LOCATION_SUCCESS,
//   coords
// });

// export const GET_CURRENT_LOCATION_ERROR = 'GET_CURRENT_LOCATION_ERROR';
// export const getCurrentLocationError = (error) => ({
//   type: GET_CURRENT_LOCATION_ERROR,
//   error
// });

// export const getCurrentLocation = () => dispatch => {
//   dispatch(coordsLoadingStatusTrue());
//   const positionOptions = {
//     timeout: 6000
//   };
//   return new Promise((res, rej) => {
//     function success(position) {
//       const lat = position.coords.latitude;
//       const long = position.coords.longitude;
//       const coords = `${lat},${long}`;
//       res(coords);
//     }
//     function error(err) {
//       console.warn(`Error ${err.code}: ${err.message}`);
//       rej(err);
//     }
//     navigator.geolocation.getCurrentPosition(success, error, positionOptions);
//   }).then((coords) => {
//     dispatch(
//       fetchLocationCoordsSuccess(coords)
//     );
//     dispatch(
//       fetchSunTimes(coords)
//     );
//     dispatch(
//       fetchWeather(coords)
//     );
//     dispatch(
//       fetchInspiration(coords)
//     );
//     return coords;
//   }).catch((error) => (
//     dispatch(
//       getCurrentLocationError(error)
//     )
//   ));
// };


// // Fetch Sun Times
// export const FETCH_SUN_TIMES_SUCCESS = 'FETCH_SUN_TIMES_SUCCESS';
// export const fetchSunTimesSuccess = (results) => ({
//   type: FETCH_SUN_TIMES_SUCCESS,
//   results
// });

// export const FETCH_SUN_TIMES_ERROR = 'FETCH_SUN_TIMES_ERROR';
// export const fetchSunTimesError = (error) => ({
//   type: FETCH_SUN_TIMES_ERROR,
//   error
// });




// // Fetch Weather Info
// export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
// export const fetchWeatherSuccess = (weather) => ({
//   type: FETCH_WEATHER_SUCCESS,
//   weather
// });

// export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';
// export const fetchWeatherError = (error) => ({
//   type: FETCH_WEATHER_ERROR,
//   error
// });

// export const fetchWeather = coords => dispatch => {
//   const url = `https://api.wunderground.com/api/55dac1657530ad42/conditions/q/${coords}.json`;
//   return fetch(url, {
//     method: 'GET'
//   }).then((response) => {
//     if (response.status < 200 || response.status >= 300) {
//       const error = new Error(response.statusText);
//       error.response = response;
//       throw error;
//     }
//     return response;
//   }).then((response) => (
//     response.json()
//   )).then((weather) => (
//     dispatch(
//       fetchWeatherSuccess(weather)
//     )
//   ))
//   .catch((error) => (
//     dispatch(
//       fetchWeatherError(error)
//     )
//   ));
// };


// // Fetch 500px Inspiration
// export const FETCH_INSPIRATION_SUCCESS = 'FETCH_INSPIRATION_SUCCESS';
// export const fetchInspirationSuccess = (inspiration) => ({
//   type: FETCH_INSPIRATION_SUCCESS,
//   inspiration
// });

// export const FETCH_INSPIRATION_ERROR = 'FETCH_INSPIRATION_ERROR';
// export const fetchInspirationError = (error) => ({
//   type: FETCH_INSPIRATION_ERROR,
//   error
// });

// export const fetchInspiration = coords => dispatch => {
//   const url = `https://api.500px.com/v1/photos/search?geo=${coords},16093&image_size=440&consumer_key=R8Sy4wkElwg0T1PPCce2tE5nXxJHeKKfRVKJclov
// `;
//   return fetch(url, {
//     method: 'GET'
//   }).then((response) => {
//     if (response.status < 200 || response.status >= 300) {
//       const error = new Error(response.statusText);
//       error.response = response;
//       throw error;
//     }
//     return response;
//   }).then((response) => (
//     response.json()
//   )).then((inspiration) => (
//     dispatch(
//       fetchInspirationSuccess(inspiration)
//     )
//   ))
//   .catch((error) => (
//     dispatch(
//       fetchInspirationError(error)
//     )
//   ));
// };

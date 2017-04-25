import 'isomorphic-fetch';
import Auth from '../components/modules/Auth';

/**
*
* AUTH SECTION
*
**/

// Auth Loading Element
export const AUTH_LOADING_STATUS_TRUE = 'AUTH_LOADING_STATUS_TRUE';
export const authLoadingStatusTrue = () => ({
  type: AUTH_LOADING_STATUS_TRUE,
});

// Clean Auth - set all auth related state to initial
export const CLEAN_AUTH = 'CLEAN_AUTH';
export const cleanAuth = () => ({
  type: CLEAN_AUTH,
});

/**
* REGISTER USER
**/
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

// POST to API for new user registration
export const registerUser = user => dispatch => {
  dispatch(authLoadingStatusTrue());
  const registrationEndpoint = '/auth/registration';
  const userData = user;
  return fetch(registrationEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData),
  }).then((response) => {
    if (response.status === 200) {
      // success
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
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};

/**
* LOGIN USER
**/
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = (loginSuccessMessage) => ({
  type: LOGIN_USER_SUCCESS,
  loginSuccessMessage,
});

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const loginUserError = (loginErrorMessage) => ({
  type: LOGIN_USER_ERROR,
  loginErrorMessage,
});

// POST to API to login existing user
export const loginUser = user => dispatch => {
  dispatch(authLoadingStatusTrue());
  const loginEndpoint = '/auth/login';
  const userData = user;
  return fetch(loginEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData),
  }).then((response) => {
    if (response.status === 200) {
      // success
      return response.json()
        .then((successResponse) => {
          Auth.authenticateUser(successResponse.token);
          Auth.storeUserID(successResponse.user.userID);
          dispatch(loginUserSuccess(successResponse));
        });
    } return response.json()
      // failure
        .then((errorResponse) => {
          const errors = errorResponse.errors ? errorResponse.errors : {};
          errors.summary = errorResponse.message;
          dispatch(loginUserError(errors));
        });
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};

/**
*
* CITIES SECTION
*
**/

// Cities Loading Element
export const CITIES_LOADING_STATUS_TRUE = 'CITIES_LOADING_STATUS_TRUE';
export const citiesLoadingStatusTrue = () => ({
  type: CITIES_LOADING_STATUS_TRUE,
});

/**
* GET CITIES
**/
export const GET_CITIES_SUCCESS = 'GET_CITIES_SUCCESS';
export const getCitiesSuccess = (citiesList) => ({
  type: GET_CITIES_SUCCESS,
  citiesList,
});

export const GET_CITIES_ERROR = 'GET_CITIES_ERROR';
export const getCitiesError = (citiesError) => ({
  type: GET_CITIES_ERROR,
  citiesError,
});

// GET request to API for all cities
export const getCities = () => dispatch => {
  dispatch(citiesLoadingStatusTrue());
  const userID = Auth.getUserID();
  const citiesEndpoint = `/api/cities/${userID}`;
  return fetch(citiesEndpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `bearer ${Auth.getToken()}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
        .then((successResponse) => {
          dispatch(getCitiesSuccess(successResponse));
        });
    } return response.json()
      .then((errorResponse) => {
        dispatch(getCitiesError(errorResponse));
      });
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};

/**
* ADD CITY
**/
export const ADD_CITY_SUCCESS = 'ADD_CITY_SUCCESS';
export const addCitySuccess = (addCityMsg) => ({
  type: ADD_CITY_SUCCESS,
  addCityMsg,
});

export const ADD_CITY_ERROR = 'ADD_CITY_ERROR';
export const addCityError = (addCityMsg) => ({
  type: ADD_CITY_ERROR,
  addCityMsg,
});

// POST to API for adding city
export const addCity = (cityData) => dispatch => {
  dispatch(citiesLoadingStatusTrue());
  const userID = Auth.getUserID();
  const coords = cityData.coords;
  const lat = coords.lat;
  const lng = coords.lng;
  const cityName = cityData.cityName;
  const citiesEndpoint = '/api/cities';
  return fetch(citiesEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `bearer ${Auth.getToken()}`,
    },
    body: JSON.stringify({
      userID,
      coords: {
        lat,
        lng,
      },
      cityName,
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json()
        .then((successResponse) => {
          dispatch(addCitySuccess(successResponse));
        })
        .then(() => (
          dispatch(getCities())
        ));
    } return response.json()
      .then((errorResponse) => {
        dispatch(addCityError(errorResponse));
      });
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};

/**
* DELETE CITY
**/
export const DELETE_CITY_SUCCESS = 'DELETE_CITY_SUCCESS';
export const deleteCitySuccess = (deleteCityMsg) => ({
  type: DELETE_CITY_SUCCESS,
  deleteCityMsg,
});

export const DELETE_CITY_ERROR = 'DELETE_CITY_ERROR';
export const deleteCityError = (deleteCityMsg) => ({
  type: DELETE_CITY_ERROR,
  deleteCityMsg,
});

// DELETE request to API to delete a city
export const deleteCity = (cityID) => dispatch => {
  dispatch(citiesLoadingStatusTrue());
  const citiesEndpoint = `/api/cities/${cityID}`;
  return fetch(citiesEndpoint, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `bearer ${Auth.getToken()}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
        .then((successResponse) => {
          dispatch(deleteCitySuccess(successResponse));
        })
        .then(() => (
          dispatch(getCities())
        ));
    } return response.json()
      .then((errorResponse) => {
        dispatch(deleteCityError(errorResponse));
      });
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};

/**
*
* CITIY BREW SECTION
*
**/

// City Brewery List Loading Element
export const BREWERY_LIST_LOADING_STATUS_TRUE = 'BREWERY_LIST_LOADING_STATUS_TRUE';
export const breweryListLoadingStatusTrue = () => ({
  type: BREWERY_LIST_LOADING_STATUS_TRUE,
});

// Clean City Brew List  - set all brew list related state to initial
export const CLEAN_CITY_BREW_LIST = 'CLEAN_CITY_BREW_LIST';
export const cleanCityBrewList = () => ({
  type: CLEAN_CITY_BREW_LIST,
});

// Set Brewery Filter
export const SET_BREWERY_FILTER = 'SET_BREWERY_FILTER';
export const setBreweryFilter = (filter) => ({
  type: SET_BREWERY_FILTER,
  filter,
});

/**
* GET CITY BREWERY LIST
**/
export const GET_CITY_BREWERY_LIST_SUCCESS = 'GET_CITY_BREWERY_LIST_SUCCESS';
export const getCityBreweryListSuccess = (currentCityData) => ({
  type: GET_CITY_BREWERY_LIST_SUCCESS,
  currentCityData,
});

export const GET_CITY_BREWERY_LIST_ERROR = 'GET_CITY_BREWERY_LIST_ERROR';
export const getCityBreweryListError = (currentCityListError) => ({
  type: GET_CITY_BREWERY_LIST_ERROR,
  currentCityListError,
});

// GET request to API for list of breweries
export const getCityBreweryList = (cityID) => dispatch => {
  dispatch(breweryListLoadingStatusTrue());
  const citiesEndpoint = `/api/city/${cityID}`;
  return fetch(citiesEndpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `bearer ${Auth.getToken()}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
        .then((successResponse) => {
          dispatch(getCityBreweryListSuccess(successResponse));
        });
    } return response.json()
      .then((errorResponse) => {
        dispatch(getCityBreweryListError(errorResponse));
      });
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};

/**
* CHECKOFF BREWERY
**/
export const CHECKOFF_BREWERY_SUCCESS = 'CHECKOFF_BREWERY_SUCCESS';
export const checkoffBrewerySuccess = () => ({
  type: CHECKOFF_BREWERY_SUCCESS,
});

export const CHECKOFF_BREWERY_ERROR = 'CHECKOFF_BREWERY_ERROR';
export const checkoffBreweryError = () => ({
  type: CHECKOFF_BREWERY_ERROR,
});

// POST to API to add or update completionStatus of a brewery
export const checkoffBrewery = (breweryID, cityID, checkValue) => dispatch => {
  dispatch(breweryListLoadingStatusTrue());
  const currentCityID = cityID;
  const userID = Auth.getUserID();
  const cityEndpoint = '/api/city';
  return fetch(cityEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `bearer ${Auth.getToken()}`,
    },
    body: JSON.stringify({
      userID,
      cityID,
      breweryID,
      completionStatus: checkValue,
    }),
  }).then((response) => {
    if (response.status >= 200 || response.status < 300) {
      return response.json()
        .then(() => {
          dispatch(checkoffBrewerySuccess());
        })
        .then(() => (
          dispatch(getCityBreweryList(currentCityID)))
        );
    } return response.json()
      .then(() => {
        dispatch(checkoffBreweryError());
      });
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};

/**
* RATE BREWERY
**/
export const RATE_BREWERY_SUCCESS = 'RATE_BREWERY_SUCCESS';
export const rateBrewerySuccess = () => ({
  type: RATE_BREWERY_SUCCESS,
});

export const RATE_BREWERY_ERROR = 'RATE_BREWERY_ERROR';
export const rateBreweryError = () => ({
  type: RATE_BREWERY_ERROR,
});

// POST to API to add or update rating of a brewery
export const rateBrewery = (breweryID, cityID, ratingValue) => dispatch => {
  dispatch(breweryListLoadingStatusTrue());
  const currentCityID = cityID;
  const userID = Auth.getUserID();
  const cityEndpoint = '/api/city';
  return fetch(cityEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `bearer ${Auth.getToken()}`,
    },
    body: JSON.stringify({
      userID,
      cityID,
      breweryID,
      rating: ratingValue,
    }),
  }).then((response) => {
    if (response.status >= 200 || response.status < 300) {
      return response.json()
        .then(() => {
          dispatch(rateBrewerySuccess());
        })
        .then(() => (
          dispatch(getCityBreweryList(currentCityID)))
        );
    } return response.json()
      .then(() => {
        dispatch(rateBreweryError());
      });
  }).catch((error) => (
    console.log(error) // eslint-disable-line
  ));
};


import 'isomorphic-fetch';
import Auth from '../components/modules/Auth';

// Loading Element
export const LOADING_STATUS_TRUE = 'LOADING_STATUS_TRUE';
export const loadingStatusTrue = () => ({
  type: LOADING_STATUS_TRUE,
});

// Clean Auth - set all auth related state to initial
export const CLEAN_AUTH = 'CLEAN_AUTH';
export const cleanAuth = () => ({
  type: CLEAN_AUTH,
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

// AJAX to server for registration
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
    body: JSON.stringify(userData),
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
  }).catch((error) => (
    console.log(error)
  ));
};

// Login User
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

// AJAX to server for Login
export const loginUser = user => dispatch => {
  dispatch(loadingStatusTrue());
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
    console.log(error)
  ));
};

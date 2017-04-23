import * as actions from '../actions/index';

const initialState = {
  authLoadingStatus: false,
  registrationSuccessMessage: {},
  registrationErrorMessage: {},
  loginSuccessMessage: {},
  loginErrorMessage: {},
  loginStatus: false,
  currentUser: null,
};

export const authReducer = (state = initialState, action) => {
  if (action.type === actions.AUTH_LOADING_STATUS_TRUE) {
    const modState = Object.assign({}, state, {
      authLoadingStatus: true,
    });
    return modState;
  } else if (action.type === actions.REGISTER_USER_SUCCESS) {
    const successMessage = action.registrationSuccessMessage;
    const modState = Object.assign({}, state, {
      authLoadingStatus: false,
      registrationSuccessMessage: successMessage,
      registrationErrorMessage: {},
    });
    return modState;
  } else if (action.type === actions.REGISTER_USER_ERROR) {
    const errors = action.registrationErrorMessage;
    const modState = Object.assign({}, state, {
      authLoadingStatus: false,
      registrationErrorMessage: errors,
    });
    return modState;
  } else if (action.type === actions.LOGIN_USER_SUCCESS) {
    const successMessage = action.loginSuccessMessage;
    console.log('% Reducer', successMessage);
    const userID = successMessage.user.userID;
    const modState = Object.assign({}, state, {
      authLoadingStatus: false,
      registrationSuccessMessage: {},
      loginErrorMessage: {},
      loginRedirect: true,
      currentUser: userID,
    });
    return modState;
  } else if (action.type === actions.LOGIN_USER_ERROR) {
    const errorMessage = action.loginErrorMessage;
    console.log('% Reducer ErrorMsg', errorMessage);
    const modState = Object.assign({}, state, {
      authLadingStatus: false,
      registrationSuccessMessage: {},
      loginErrorMessage: errorMessage,
    });
    return modState;
  } else if (action.type === actions.CLEAN_AUTH) {
    const modState = Object.assign({}, state, {
      authLoadingStatus: false,
      registrationSuccessMessage: {},
      registrationErrorMessage: {},
      loginSuccessMessage: {},
      loginErrorMessage: {},
      loginRedirect: false,
    });
    return modState;
  }
  return state;
};

export default authReducer;

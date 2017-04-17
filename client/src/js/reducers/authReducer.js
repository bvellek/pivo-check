import * as actions from '../actions/index';
import initialState from './initialState';

export const authReducer = (state = initialState, action) => {
  if (action.type === actions.LOADING_STATUS_TRUE) {
    const modState = Object.assign({}, state, {
      coordsLoadingStatus: true,
    });
    return modState;
  } else if (action.type === actions.REGISTER_USER_SUCCESS) {
    const successMessage = action.registrationSuccessMessage;
    const modState = Object.assign({}, state, {
      coordsLoadingStatus: false,
      registrationSuccessMessage: successMessage,
    });
    return modState;
  } else if (action.type === actions.REGISTER_USER_ERROR) {
    const errors = action.registrationErrorMessage;
    const modState = Object.assign({}, state, {
      coordsLoadingStatus: false,
      registrationErrorMessage: errors,
    });
    return modState;
  }
  return state;
};

export default authReducer;

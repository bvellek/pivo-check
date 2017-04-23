import { combineReducers } from 'redux';
import auth from './authReducer';
import cities from './citiesReducer';

const rootReducer = combineReducers({
  auth,
  cities,
});

export default rootReducer;

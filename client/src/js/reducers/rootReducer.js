import { combineReducers } from 'redux';
import auth from './authReducer';
import cities from './citiesReducer';
import breweryList from './breweryListReducer';

const rootReducer = combineReducers({
  auth,
  cities,
  breweryList,
});

export default rootReducer;

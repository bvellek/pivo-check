import * as actions from '../actions/index';

const initialState = {
  citiesLoadingStatus: false,
  myCities: [],
  citiesErrorStatus: false,
  displayCities: false,
  addCityMsg: null,
};

export const citiesReducer = (state = initialState, action) => {
  if (action.type === actions.CITIES_LOADING_STATUS_TRUE) {
    const modState = Object.assign({}, state, {
      citiesLoadingStatus: true,
    });
    return modState;
  } else if (action.type === actions.GET_CITIES_SUCCESS) {
    const citiesArr = action.citiesList;
    const modState = Object.assign({}, state, {
      citiesLoadingStatus: false,
      myCities: citiesArr,
      citiesErrorStatus: false,
      displayCities: true,
    });
    return modState;
  } else if (action.type === actions.GET_CITIES_ERROR) {
    // const citiesErrorMsg = action.citiesError;
    console.log('$ coming from citiesReducer', action.citiesError);
    const modState = Object.assign({}, state, {
      citiesLoadingStatus: false,
      myCities: [],
      citiesErrorStatus: true,
      displayCities: false,
    });
    return modState;
  } else if (action.type === actions.ADD_CITY_SUCCESS) {
    const addCityMsg = action.addCityMsg;
    const modState = Object.assign({}, state, {
      citiesLoadingStatus: false,
      addCityMsg,
    });
    return modState;
  } else if (action.type === actions.ADD_CITY_ERROR) {
    const addCityMsg = action.addCityMsg;
    const modState = Object.assign({}, state, {
      citiesLoadingStatus: false,
      addCityMsg,
    });
    return modState;
  }
  return state;
};

export default citiesReducer;

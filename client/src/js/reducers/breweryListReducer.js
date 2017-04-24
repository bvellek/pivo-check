import * as actions from '../actions/index';

const initialState = {
  breweryListLoadingStatus: false,
  currentCityData: {},
  currentCityListErrorStatus: false,
};

export const breweryListReducer = (state = initialState, action) => {
  if (action.type === actions.BREWERY_LIST_LOADING_STATUS_TRUE) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: true,
    });
    return modState;
  } else if (action.type === actions.GET_CITY_BREWERY_LIST_SUCCESS) {
    const currentCityData = action.currentCityData;
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      currentCityData,
      currentCityListErrorStatus: false,
    });
    return modState;
  } else if (action.type === actions.GET_CITY_BREWERY_LIST_ERROR) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      currentCityListErrorStatus: true,
    });
    return modState;
  }
  // } else if (action.type === actions.GET_CITIES_ERROR) {
  //   // const citiesErrorMsg = action.citiesError;
  //   console.log('$ coming from citiesReducer', action.citiesError);
  //   const modState = Object.assign({}, state, {
  //     citiesLoadingStatus: false,
  //     myCities: [],
  //     citiesErrorStatus: true,
  //     displayCities: false,
  //   });
  //   return modState;
  // } else if (action.type === actions.ADD_CITY_SUCCESS) {
  //   const modState = Object.assign({}, state, {
  //     citiesLoadingStatus: false,
  //     addCityErrorStatus: false,
  //   });
  //   return modState;
  // } else if (action.type === actions.ADD_CITY_ERROR) {
  //   const modState = Object.assign({}, state, {
  //     citiesLoadingStatus: false,
  //     addCityErrorStatus: true,
  //   });
  //   return modState;
  // } else if (action.type === actions.DELETE_CITY_SUCCESS) {
  //   const modState = Object.assign({}, state, {
  //     citiesLoadingStatus: false,
  //     deleteCityErrorStatus: false,
  //   });
  //   return modState;
  // } else if (action.type === actions.DELETE_CITY_ERROR) {
  //   const modState = Object.assign({}, state, {
  //     citiesLoadingStatus: false,
  //     deleteCityErrorStatus: true,
  //   });
  //   return modState;
  return state;
};

export default breweryListReducer;

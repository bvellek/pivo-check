import * as actions from '../actions/index';

export const initialState = {
  breweryListLoadingStatus: false,
  currentCityData: {
    brewArr: [],
    cityName: '',
    cityID: '',
  },
  currentBreweryListErrorStatus: false,
  checkoffErrorStatus: false,
  breweryFilter: 'none',
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
      currentBreweryListErrorStatus: false,
    });
    return modState;
  } else if (action.type === actions.GET_CITY_BREWERY_LIST_ERROR) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      currentBreweryListErrorStatus: true,
    });
    return modState;
  } else if (action.type === actions.SET_BREWERY_FILTER) {
    const filter = action.filter;
    const modState = Object.assign({}, state, {
      breweryFilter: filter,
    });
    return modState;
  } else if (action.type === actions.CHECKOFF_BREWERY_SUCCESS) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: false,
    });
    return modState;
  } else if (action.type === actions.CHECKOFF_BREWERY_ERROR) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: true,
    });
    return modState;
  } else if (action.type === actions.CHECKOFF_BREWERY_SUCCESS) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: false,
    });
    return modState;
  } else if (action.type === actions.CHECKOFF_BREWERY_ERROR) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: true,
    });
    return modState;
  } else if (action.type === actions.CLEAN_CITY_BREW_LIST) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      currentCityData: {
        brewArr: [],
        cityName: '',
        cityID: '',
      },
      currentBreweryListErrorStatus: false,
      breweryFilter: 'none',
      checkoffErrorStatus: false,
    });
    return modState;
  }
  return state;
};

export default breweryListReducer;

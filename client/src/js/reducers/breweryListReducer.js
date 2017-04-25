import * as actions from '../actions/index';

const initialState = {
  breweryListLoadingStatus: false,
  currentCityData: {
    brewArr: [],
    cityName: '',
    cityID: '',
  },
  currentCityListErrorStatus: false,
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
      currentCityListErrorStatus: false,
    });
    return modState;
  } else if (action.type === actions.GET_CITY_BREWERY_LIST_ERROR) {
    const modState = Object.assign({}, state, {
      breweryListLoadingStatus: false,
      currentCityListErrorStatus: true,
    });
    return modState;
  } else if (action.type === actions.SET_BREWERY_FILTER) {
    const filter = action.filter;
    const modState = Object.assign({}, state, {
      breweryFilter: filter,
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
      currentCityListErrorStatus: false,
      breweryFilter: 'none',
    });
    return modState;
  }
  return state;
};

export default breweryListReducer;

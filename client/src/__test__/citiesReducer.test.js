import { citiesReducer, initialState } from '../js/reducers/citiesReducer';

describe('Cities Reducer', () => {
  it('should return the intial state when no matching action is dispatched', () => {
    expect(citiesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CITIES_LOADING_STATUS_TRUE by changing citiesLoadingStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      citiesLoadingStatus: true,
    });
    expect(citiesReducer(initialState, {
      type: 'CITIES_LOADING_STATUS_TRUE',
    })).toEqual(stateAfter);
  });

  it('should handle GET_CITIES_SUCCESS by stopping loading status, passing cities list, setting error status to false, and displayCities true', () => {
    const citiesArr = ['seatte', 'atlanta', 'boston'];
    const stateAfter = Object.assign({}, initialState, {
      citiesLoadingStatus: false,
      myCities: citiesArr,
      citiesErrorStatus: false,
      displayCities: true,
    });
    expect(citiesReducer(initialState, {
      type: 'GET_CITIES_SUCCESS',
      citiesList: citiesArr,
    })).toEqual(stateAfter);
  });

  it('should handle GET_CITIES_ERROR by stopping loading status, clearing cities, setting cities error status to true, displayCities false', () => {
    const stateAfter = Object.assign({}, initialState, {
      citiesLoadingStatus: false,
      myCities: [],
      citiesErrorStatus: true,
      displayCities: false,
    });
    expect(citiesReducer(initialState, {
      type: 'GET_CITIES_ERROR',
    })).toEqual(stateAfter);
  });

  it('should handle ADD_CITY_SUCCESS by clearing loading status and saying city error status is false', () => {
    const stateAfter = Object.assign({}, initialState, {
      citiesLoadingStatus: false,
      addCityErrorStatus: false,
    });
    expect(citiesReducer(initialState, {
      type: 'ADD_CITY_SUCCESS',
    })).toEqual(stateAfter);
  });

  it('should handle ADD_CITY_ERROR by passing clearing loading status and addCityErrorStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      citiesLoadingStatus: false,
      addCityErrorStatus: true,
    });
    expect(citiesReducer(initialState, {
      type: 'ADD_CITY_ERROR',
    })).toEqual(stateAfter);
  });

  it('should handle DELETE_CITY_SUCCESS by clearing loading status, setting deleteCityErrorStatus to false', () => {
    const stateAfter = Object.assign({}, initialState, {
      citiesLoadingStatus: false,
      deleteCityErrorStatus: false,
    });
    expect(citiesReducer(initialState, {
      type: 'DELETE_CITY_SUCCESS',
    })).toEqual(stateAfter);
  });

  it('should handle DELETE_CITY_ERROR by clearing loading status, setting deleteCityErrorStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      citiesLoadingStatus: false,
      deleteCityErrorStatus: true,
    });
    expect(citiesReducer(initialState, {
      type: 'DELETE_CITY_ERROR',
    })).toEqual(stateAfter);
  });
});

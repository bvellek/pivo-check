import { breweryListReducer, initialState } from '../js/reducers/breweryListReducer';

describe('breweryList Reducer', () => {
  it('should return the intial state when no matching action is dispatched', () => {
    expect(breweryListReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle BREWERY_LIST_LOADING_STATUS_TRUE by changing breweryListLoadingStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      breweryListLoadingStatus: true,
    });
    expect(breweryListReducer(initialState, {
      type: 'BREWERY_LIST_LOADING_STATUS_TRUE',
    })).toEqual(stateAfter);
  });

  it('should handle GET_CITY_BREWERY_LIST_SUCCESS by stopping loading status, passing currentCityData, setting currentBreweryListErrorStatus to false', () => {
    const currentCityData = {
      brewArr: ['a brewery', 'b brewery'],
      cityName: 'Seattle, WA',
      cityID: 'ABC123',
    };
    const stateAfter = Object.assign({}, initialState, {
      breweryListLoadingStatus: false,
      currentCityData,
      currentBreweryListErrorStatus: false,
    });
    expect(breweryListReducer(initialState, {
      type: 'GET_CITY_BREWERY_LIST_SUCCESS',
      currentCityData,
    })).toEqual(stateAfter);
  });

  it('should handle GET_CITY_BREWERY_LIST_ERROR by stopping loading status, setting currentBreweryListErrorStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      breweryListLoadingStatus: false,
      currentBreweryListErrorStatus: true,
    });
    expect(breweryListReducer(initialState, {
      type: 'GET_CITY_BREWERY_LIST_ERROR',
    })).toEqual(stateAfter);
  });

  it('should handle SET_BREWERY_FILTER by clearing loading status and saying city error status is false', () => {
    const filter = 'micro';
    const stateAfter = Object.assign({}, initialState, {
      breweryFilter: filter,
    });
    expect(breweryListReducer(initialState, {
      type: 'SET_BREWERY_FILTER',
      filter,
    })).toEqual(stateAfter);
  });

  it('should handle CHECKOFF_BREWERY_SUCCESS by passing clearing loading status and checkoffErrorStatus to false', () => {
    const stateAfter = Object.assign({}, initialState, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: false,
    });
    expect(breweryListReducer(initialState, {
      type: 'CHECKOFF_BREWERY_SUCCESS',
    })).toEqual(stateAfter);
  });

  it('should handle CHECKOFF_BREWERY_ERROR by clearing loading status, setting checkoffErrorStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: true,
    });
    expect(breweryListReducer(initialState, {
      type: 'CHECKOFF_BREWERY_ERROR',
    })).toEqual(stateAfter);
  });

  it('should handle RATE_BREWERY_SUCCESS by clearing loading status, setting checkoffErrorStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: false,
    });
    expect(breweryListReducer(initialState, {
      type: 'RATE_BREWERY_SUCCESS',
    })).toEqual(stateAfter);
  });

  it('should handle RATE_BREWERY_ERROR by clearing loading status, setting checkoffErrorStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      breweryListLoadingStatus: false,
      checkoffErrorStatus: true,
    });
    expect(breweryListReducer(initialState, {
      type: 'RATE_BREWERY_ERROR',
    })).toEqual(stateAfter);
  });

  it('should handle CLEAN_CITY_BREW_LIST by clearing loading status, clearing currentCityData, errorStatuses and brewFilter', () => {
    const stateAfter = Object.assign({}, initialState, {
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
    expect(breweryListReducer(initialState, {
      type: 'CLEAN_CITY_BREW_LIST',
    })).toEqual(stateAfter);
  });
});

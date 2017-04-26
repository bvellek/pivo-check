import * as actions from '../js/actions/index';

// Auth Loading Status Test
describe('Auth Loading Status Action', () => {
  it('should create an action to loading status to true', () => {
    const expectedAction = {
      type: 'AUTH_LOADING_STATUS_TRUE',
    };
    expect(actions.authLoadingStatusTrue()).toEqual(expectedAction);
  });
});

// Clean Auth Test
describe('Clean Auth Action', () => {
  it('should create an action type CLEAN_AUTH', () => {
    const expectedAction = {
      type: 'CLEAN_AUTH',
    };
    expect(actions.cleanAuth()).toEqual(expectedAction);
  });
});

// Register User Test
describe('Register User Success Action', () => {
  it('should create an action to show register user success and pass the registrationSuccessMessage', () => {
    const testMsg = {
      message: 'Register Succesful',
      status: 'Success',
    };
    const expectedAction = {
      type: 'REGISTER_USER_SUCCESS',
      registrationSuccessMessage: {
        message: 'Register Succesful',
        status: 'Success',
      },
    };
    expect(actions.registerUserSuccess(testMsg)).toEqual(expectedAction);
  });
});

describe('Register User Error Action', () => {
  it('should create an action to show register user error and pass the registrationErrorMessage', () => {
    const testMsg = {
      message: 'Passwords do not match',
      status: 'Fail',
    };
    const expectedAction = {
      type: 'REGISTER_USER_ERROR',
      registrationErrorMessage: {
        message: 'Passwords do not match',
        status: 'Fail',
      },
    };
    expect(actions.registerUserError(testMsg)).toEqual(expectedAction);
  });
});

// Login User Test
describe('Login User Success Action', () => {
  it('should create an action to show login user success and pass the loginSuccessMessage', () => {
    const testMsg = {
      message: 'Login Successful',
      status: 'Success',
    };
    const expectedAction = {
      type: 'LOGIN_USER_SUCCESS',
      loginSuccessMessage: {
        message: 'Login Successful',
        status: 'Success',
      },
    };
    expect(actions.loginUserSuccess(testMsg)).toEqual(expectedAction);
  });
});

describe('Login User Error Action', () => {
  it('should create an action to show login user error and pass the loginErrorMessage', () => {
    const testMsg = {
      message: 'Email not found',
      status: 'Fail',
    };
    const expectedAction = {
      type: 'LOGIN_USER_ERROR',
      loginErrorMessage: {
        message: 'Email not found',
        status: 'Fail',
      },
    };
    expect(actions.loginUserError(testMsg)).toEqual(expectedAction);
  });
});

// Cities Loading Status Test
describe('City Loading Status Action', () => {
  it('should create an action to loading status to true', () => {
    const expectedAction = {
      type: 'CITIES_LOADING_STATUS_TRUE',
    };
    expect(actions.citiesLoadingStatusTrue()).toEqual(expectedAction);
  });
});

// Get Cities Test
describe('Get Cities Success Action', () => {
  it('should create an action to show get cities success and pass the citiesList', () => {
    const testMsg = [
      { cityName: 'Toronto',
        cityID: 12345,
      },
      { cityName: 'Baltimore',
        cityID: 8910,
      },
    ];
    const expectedAction = {
      type: 'GET_CITIES_SUCCESS',
      citiesList: testMsg,
    };
    expect(actions.getCitiesSuccess(testMsg)).toEqual(expectedAction);
  });
});

describe('Get Cities Error Action', () => {
  it('should create an action to show get cities error and pass the citiesError', () => {
    const testMsg = {
      message: 'Email not found',
      status: 'Fail',
    };
    const expectedAction = {
      type: 'GET_CITIES_ERROR',
      citiesError: testMsg,
    };
    expect(actions.getCitiesError(testMsg)).toEqual(expectedAction);
  });
});


// Add City Test
describe('Add city Success Action', () => {
  it('should create an action to show add city success and pass the addCityMsg', () => {
    const testMsg = {
      cityName: 'Toronto',
      cityID: 12345,
    };
    const expectedAction = {
      type: 'ADD_CITY_SUCCESS',
      addCityMsg: testMsg,
    };
    expect(actions.addCitySuccess(testMsg)).toEqual(expectedAction);
  });
});

describe('Add city Error Action', () => {
  it('should create an action to show add city error and pass the addCityMsg', () => {
    const testMsg = {
      message: 'City not found',
      status: 'Fail',
    };
    const expectedAction = {
      type: 'ADD_CITY_ERROR',
      addCityMsg: testMsg,
    };
    expect(actions.addCityError(testMsg)).toEqual(expectedAction);
  });
});

// Delete City Test
describe('Delete city Success Action', () => {
  it('should create an action to show delete city success and pass the deleteCityMsg', () => {
    const testMsg = {
      cityName: 'Toronto',
      cityID: 12345,
    };
    const expectedAction = {
      type: 'DELETE_CITY_SUCCESS',
      deleteCityMsg: testMsg,
    };
    expect(actions.deleteCitySuccess(testMsg)).toEqual(expectedAction);
  });
});

describe('Delete city Error Action', () => {
  it('should create an action to show delete city error and pass the deleteCityMsg', () => {
    const testMsg = {
      message: 'City not found',
      status: 'Fail',
    };
    const expectedAction = {
      type: 'DELETE_CITY_ERROR',
      deleteCityMsg: testMsg,
    };
    expect(actions.deleteCityError(testMsg)).toEqual(expectedAction);
  });
});

// City Brew List Loading Status Test
describe('City Brew List Loading Status Action', () => {
  it('should create an action to loading status to true', () => {
    const expectedAction = {
      type: 'BREWERY_LIST_LOADING_STATUS_TRUE',
    };
    expect(actions.breweryListLoadingStatusTrue()).toEqual(expectedAction);
  });
});

// Clean City Brew List Test
describe('Clean City Brew List Action', () => {
  it('should create an action type CLEAN_CITY_BREW_LIST', () => {
    const expectedAction = {
      type: 'CLEAN_CITY_BREW_LIST',
    };
    expect(actions.cleanCityBrewList()).toEqual(expectedAction);
  });
});

// Set Brewery Filter Test
describe('Set brewery filter Action', () => {
  it('should create an action type SET_BREWERY_FILTER and pass the filter', () => {
    const testMsg = 'Micro';
    const expectedAction = {
      type: 'SET_BREWERY_FILTER',
      filter: testMsg,
    };
    expect(actions.setBreweryFilter(testMsg)).toEqual(expectedAction);
  });
});

// Get City Brew List Test
describe('Get City Brew List Success Action', () => {
  it('should create an action to show get city brew list success and pass the currentCityData', () => {
    const testMsg = [
      { breweryName: 'Beers',
        breweryID: 12345,
      },
      { breweryName: 'Beers2',
        breweryID: 8910,
      },
    ];
    const expectedAction = {
      type: 'GET_CITY_BREWERY_LIST_SUCCESS',
      currentCityData: testMsg,
    };
    expect(actions.getCityBreweryListSuccess(testMsg)).toEqual(expectedAction);
  });
});

describe('Get City Brew List Error Action', () => {
  it('should create an action to show get cities error and pass the currentCityListError', () => {
    const testMsg = {
      message: 'Brewery List error',
      status: 'Fail',
    };
    const expectedAction = {
      type: 'GET_CITY_BREWERY_LIST_ERROR',
      currentCityListError: testMsg,
    };
    expect(actions.getCityBreweryListError(testMsg)).toEqual(expectedAction);
  });
});

// Checkoff Brewery Test
describe('Checkoff Brewery Success Action', () => {
  it('should create an action to show checkoff brewery success', () => {
    const expectedAction = {
      type: 'CHECKOFF_BREWERY_SUCCESS',
    };
    expect(actions.checkoffBrewerySuccess()).toEqual(expectedAction);
  });
});

describe('Checkoff Brewery Error Action', () => {
  it('should create an action to show checkoff brewery error', () => {
    const expectedAction = {
      type: 'CHECKOFF_BREWERY_ERROR',
    };
    expect(actions.checkoffBreweryError()).toEqual(expectedAction);
  });
});

// Rate Brewery Test
describe('Rate Brewery Success Action', () => {
  it('should create an action to show rate brewery success', () => {
    const expectedAction = {
      type: 'RATE_BREWERY_SUCCESS',
    };
    expect(actions.rateBrewerySuccess()).toEqual(expectedAction);
  });
});

describe('Rate Brewery Error Action', () => {
  it('should create an action to show rate brewery error', () => {
    const expectedAction = {
      type: 'RATE_BREWERY_ERROR',
    };
    expect(actions.rateBreweryError()).toEqual(expectedAction);
  });
});


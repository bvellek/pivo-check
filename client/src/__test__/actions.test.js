import * as actions from '../js/actions/index';

// Loading Status Test

describe('Loading Status Action', () => {
  it('should create an action to loading status to true', () => {
    const expectedAction = {
      type: 'LOADING_STATUS_TRUE',
    };
    expect(actions.loadingStatusTrue()).toEqual(expectedAction);
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

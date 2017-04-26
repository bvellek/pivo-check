import { authReducer, initialState } from '../js/reducers/authReducer';

describe('Auth Reducer', () => {
  it('should return the intial state when no matching action is dispatched', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_LOADING_STATUS_TRUE by changing authLoadingStatus to true', () => {
    const stateAfter = Object.assign({}, initialState, {
      authLoadingStatus: true,
    });
    expect(authReducer(initialState, {
      type: 'AUTH_LOADING_STATUS_TRUE',
    })).toEqual(stateAfter);
  });

  it('should handle REGISTER_USER_SUCCESS by passing registrationSuccessMessage, clearing loading status, clear registrationErrorMessage', () => {
    const successMsg = {
      status: 200,
      msg: 'success',
    };
    const stateAfter = Object.assign({}, initialState, {
      authLoadingStatus: false,
      registrationErrorMessage: {},
      registrationSuccessMessage: successMsg,
    });
    expect(authReducer(initialState, {
      type: 'REGISTER_USER_SUCCESS',
      registrationSuccessMessage: successMsg,
    })).toEqual(stateAfter);
  });

  it('should handle REGISTER_USER_ERROR by passing registrationErrorMessage, clearing loading status', () => {
    const errorMsg = {
      status: 500,
      msg: 'fail',
    };
    const stateAfter = Object.assign({}, initialState, {
      authLoadingStatus: false,
      registrationErrorMessage: errorMsg,
    });
    expect(authReducer(initialState, {
      type: 'REGISTER_USER_ERROR',
      registrationErrorMessage: errorMsg,
    })).toEqual(stateAfter);
  });

  it('should handle LOGIN_USER_SUCCESS by passing clearing loading status, clearing registrationSuccessMessage, clearing loginErrorMessage, setting loginRedirect to true, and passing a userID', () => {
    const successMessage = {
      user: {
        userID: '123ABCDefg',
      },
    };
    const stateAfter = Object.assign({}, initialState, {
      authLoadingStatus: false,
      registrationSuccessMessage: {},
      loginErrorMessage: {},
      loginRedirect: true,
      currentUser: '123ABCDefg',
    });
    expect(authReducer(initialState, {
      type: 'LOGIN_USER_SUCCESS',
      loginSuccessMessage: successMessage,
    })).toEqual(stateAfter);
  });

  it('should handle LOGIN_USER_ERROR by passing clearing loading status, clearing registrationSuccessMessage, passing loginErrorMessage', () => {
    const errorMsg = {
      error: true,
    };
    const stateAfter = Object.assign({}, initialState, {
      authLoadingStatus: false,
      registrationSuccessMessage: {},
      loginErrorMessage: errorMsg,
    });
    expect(authReducer(initialState, {
      type: 'LOGIN_USER_ERROR',
      loginErrorMessage: errorMsg,
    })).toEqual(stateAfter);
  });

  it('should handle CLEAN_AUTH by clearing authLoadingStatus, registrationSuccessMessage, registrationErrorMessage, loginSuccessMessage, loginErrorMessage, and loginRedirect', () => {
    const stateAfter = Object.assign({}, initialState, {
      authLoadingStatus: false,
      registrationSuccessMessage: {},
      registrationErrorMessage: {},
      loginSuccessMessage: {},
      loginErrorMessage: {},
      loginRedirect: false,
    });
    expect(authReducer(initialState, {
      type: 'CLEAN_AUTH',
    })).toEqual(stateAfter);
  });
});

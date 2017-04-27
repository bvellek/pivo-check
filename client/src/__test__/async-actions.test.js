import thunk from 'redux-thunk';
import 'isomorphic-fetch';
import configureMockStore from 'redux-mock-store';
import * as actions from '../js/actions/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// const mockResponse = (status, statusText, response) => (
//   new window.Response(response, {
//     status,
//     statusText,
//     headers: {
//       'Content-type': 'application/json',
//     },
//   })
// );

// describe('registerUser async Action', () => {
//   it('calls request and success actions if the response was successful', () => {
//     const user = {
//       email: 'johnDoe@email.com',
//       pass: 'password',
//     };
//     const res = {
//       success: {
//         user,
//       },
//     };
//     const store = mockStore({
//       authLoadingStatus: false,
//       registrationSuccessMessage: res,
//       registrationErrorMessage: {},
//     });
//     window.fetch = jest.fn().mockImplementation(() => (
//       Promise.resolve(mockResponse(200, null, res))
//     ));

//     return store.dispatch(registerUser(user))
//       .then(() => {
//         const expectedActions = store.getActions();
//         expect(expectedActions.length).toBe(2);
//       });
//   });
// });

describe('registerUser', () => {
  xit('Should dispatch authLoadingStatusTrue, registerUserSuccess', () => {
    const user = {
      email: 'johnDoe@email.com',
      pass: 'password',
    };

    global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
              ok: true,
              json() {
                return user;
              },
            })
        );

    const dispatch = jest.fn();
    return actions.registerUser()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith('/auth/registration', { body: undefined, headers: { Accept: 'application/json', 'Content-type': 'application/json' }, method: 'POST' });
      expect(dispatch).toHaveBeenCalledWith(actions.authLoadingStatusTrue());
      // expect(dispatch).toHaveBeenCalledWith(actions.registerUserSuccess(user));
    });
  });
});

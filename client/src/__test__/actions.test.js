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

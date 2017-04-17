import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as reducers from './reducers/index';

const middleware = [
  logger(),
  thunk,
];

export default function configureStore() {
  return createStore(reducers.locationReducer, applyMiddleware(...middleware));
}

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const middleware = [
  createLogger(),
  thunk,
];

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middleware));
}

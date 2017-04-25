import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const middleware = [
  // createLogger(),
  thunk,
];

if (process.env.NODE_ENV === 'dev') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  middleware.push(logger);
}

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middleware));
}

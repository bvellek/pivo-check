import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './js/store';
import App from './js/components/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  ),
  document.getElementById('root'));
registerServiceWorker();

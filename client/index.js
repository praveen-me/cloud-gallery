import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './src/containers/App';
import store from './src/store/store';
import './src/scss/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

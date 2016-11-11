require('./app.css');

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import configureStore from './store/Store';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<App store={store} />, root);
  window.store = store;
});

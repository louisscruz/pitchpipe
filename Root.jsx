require('./app.css');

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import configureStore from './store/Store';
import App from './components/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

document.addEventListener('DOMContentLoaded', () => {
  injectTapEventPlugin();
  const store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<App store={store} />, root);
  window.store = store;
});

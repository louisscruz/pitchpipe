import { createStore } from 'redux';
import RootReducer from '../reducers/RootReducer';
import RootMiddleware from '../middleware/RootMiddleware';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    RootMiddleware
  )
);

export default configureStore;

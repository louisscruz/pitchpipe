import { applyMiddleware } from 'redux';
import PlayerMiddleware from './PlayerMiddleware';
import WeatherMiddleware from './WeatherMiddleware';

const RootMiddleware = applyMiddleware(
  PlayerMiddleware,
  WeatherMiddleware
);

export default RootMiddleware;

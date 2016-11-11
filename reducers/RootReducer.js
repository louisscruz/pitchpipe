import { combineReducers } from 'redux';
import PlayerReducer from './PlayerReducer';
import WeatherReducer from './WeatherReducer';

const RootReducer = combineReducers({
  player: PlayerReducer,
  weather: WeatherReducer
});

export default RootReducer;

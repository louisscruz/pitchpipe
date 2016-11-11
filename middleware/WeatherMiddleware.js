import {
  GET_WEATHER,
  receiveWeather
} from '../actions/WeatherActions';
import { fetchWeather } from '../util/WeatherUtil';

export default ({dispatch}) => next => action => {
  const fetchWeatherSuccess = weather => dispatch(receiveWeather(weather));
  switch(action.type) {
    case GET_WEATHER:
      fetchWeather(fetchWeatherSuccess);
      return next(action);
    default:
      return next(action);
  }
};

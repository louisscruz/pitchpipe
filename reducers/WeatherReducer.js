import { RECEIVE_WEATHER } from '../actions/WeatherActions';

const defaultWeather = null;

export default (state = defaultWeather, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_WEATHER:
      return {
        city: action.weather.name,
        temperature: action.weather.main.temp,
        humidity: action.weather.main.humidity
      };
    default:
      return state;
  }
};

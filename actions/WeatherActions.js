export const GET_WEATHER = 'GET_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';

export const getWeather = () => ({
  type: GET_WEATHER
});

export const receiveWeather = weather => ({
  type: RECEIVE_WEATHER,
  weather
});

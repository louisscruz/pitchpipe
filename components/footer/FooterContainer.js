import { connect } from 'react-redux';
import { getWeather, convertTemp } from '../../actions/WeatherActions';
import Footer from './Footer';

const mapStateToProps = state => ({
  weather: state.weather,
  // convertTemp: convertTemp
});

const mapDispatchToProps = dispatch => ({
  getWeather: () => dispatch(getWeather()),
  convertTemp: temp => dispatch(convertTemp(temp))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

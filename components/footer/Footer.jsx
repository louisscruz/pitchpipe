import React from 'react'; // eslint-disable-line no-unused-vars
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { red700 } from 'material-ui/styles/colors';
import { convertTemp } from '../../util/WeatherUtil';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.convertTemp = convertTemp;
  }

  getWeather() {
    return () => {
      this.props.getWeather();
      this.setState({loading: true});
    };
  }

  render() {
    let template;
    if (!this.props.weather && !this.state.loading) {
      template = (
        <RaisedButton label="Get Temperature & Humidity" onTouchTap={this.getWeather()}/>
      );
    } else if (!this.props.weather && this.state.loading) {
      template = (
        <CircularProgress color={red700} />
      );
    } else {
      template = (
        <ul>
          <li><b>{this.props.weather.city}</b></li>
          <li>{this.convertTemp(this.props.weather.temperature)}° F</li>
          <li>{this.props.weather.humidity}% Humidity</li>
        </ul>
      );
    }
    return (
      <footer>
        {template}
      </footer>
    );
  }
}

export default Footer;

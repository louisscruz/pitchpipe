import React from 'react'; // eslint-disable-line no-unused-vars
import { convertTemp } from '../../util/WeatherUtil';
import RaisedButton from 'material-ui/RaisedButton';

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
        <p>loading weather...</p>
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

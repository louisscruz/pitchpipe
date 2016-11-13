import React from 'react'; // eslint-disable-line no-unused-vars
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
        // <button onClick={this.getWeather()}>Get Temperature & Humidity</button>
        <ul>
          <li><button onClick={this.getWeather()}>Get Temperature & Humidity</button></li>
        </ul>
      );
    } else if (!this.props.weather && this.state.loading) {
      template = (
        <ul>
          <li>loading weather...</li>
        </ul>
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

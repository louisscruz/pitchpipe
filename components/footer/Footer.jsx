import React from 'react'; // eslint-disable-line no-unused-vars
import { convertTemp } from '../../util/WeatherUtil';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.convertTemp = convertTemp;
  }

  componentDidMount() {
    this.props.getWeather();
  }

  render() {
    let template;
    if (!this.props.weather) {
      template = (
        <ul style={{visibility: 'hidden'}}>
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

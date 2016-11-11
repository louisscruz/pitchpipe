import { connect } from 'react-redux';
import PitchPipe from './PitchPipe';

const mapStateToProps = state => ({
  player: state.player,
  weather: state.weather
});

export default connect(
  mapStateToProps
)(PitchPipe);

import { connect } from 'react-redux';
import PitchPipe from './PitchPipe';

import { updatePlayer, updatePitch } from '../../actions/PlayerActions';

const mapStateToProps = state => ({
  player: state.player,
  weather: state.weather
});

const mapDispatchToProps = dispatch => ({
  updatePlayer: (parameter, value) => dispatch(updatePlayer(parameter, value)),
  updatePitch: (baseFrequency, frequency, change) => dispatch(updatePitch(baseFrequency, frequency, change))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PitchPipe);

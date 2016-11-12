import { connect } from 'react-redux';
import Header from './Header';

import { updatePlayer, updateBaseFrequency } from '../../actions/PlayerActions';
// import { adjustToBaseFrequency } from '../../util/PlayerUtil';

const mapStateToProps = state => ({
  player: state.player
});

const mapDispatchToProps = dispatch => ({
  updatePlayer: (parameter, value) => dispatch(updatePlayer(parameter, value)),
  updateBaseFrequency: value => dispatch(updateBaseFrequency(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

import merge from 'lodash/merge';
import {
  UPDATE_PLAYER,
  UPDATE_BASE_FREQUENCY,
  UPDATE_PITCH
} from '../actions/PlayerActions';
import {
  adjustToBaseFrequency,
  nextPitch
} from '../util/PlayerUtil';

const defaultPlayer = {
  isPlaying: false,
  drone: false,
  hertz: false,
  baseFrequency: 440,
  frequency: 440
};

export default (state = defaultPlayer, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch(action.type) {
    case UPDATE_PLAYER:
      newState[action.parameter] = action.value;
      return newState;
    case UPDATE_BASE_FREQUENCY:
      newState.baseFrequency = action.baseFrequency;
      newState.frequency = adjustToBaseFrequency(action.baseFrequency, newState.frequency);
      return newState;
    case UPDATE_PITCH:
      newState.frequency = nextPitch(action.baseFrequency, action.frequency, action.change);
      return newState;
    default:
      return state;
  }
};

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
import Pitch from '../util/PitchUtil';

window.pitch = window.pitch ? window.pitch : new Pitch(440);

const defaultPlayer = {
  isPlaying: false,
  drone: false,
  hertz: false,
  duration: 2000,
  baseFrequency: 440,
  frequency: 440,
  pitch: window.pitch
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
      newState.pitch.setFrequency(newState.frequency);
      return newState;
    case UPDATE_PITCH:
      newState.frequency = nextPitch(action.baseFrequency, action.frequency, action.change);
      newState.pitch.setFrequency(newState.frequency);
      return newState;
    default:
      return state;
  }
};

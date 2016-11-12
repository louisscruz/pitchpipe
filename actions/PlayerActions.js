export const UPDATE_PLAYER = 'UPDATE_PLAYER';
export const UPDATE_BASE_FREQUENCY = 'UPDATE_BASE_FREQUENCY';
export const UPDATE_PITCH = 'UPDATE_PITCH';

export const updatePlayer = (parameter, value) => ({
  type: UPDATE_PLAYER,
  parameter,
  value
});

export const updateBaseFrequency = (baseFrequency, frequency) => ({
  type: UPDATE_BASE_FREQUENCY,
  baseFrequency,
  frequency
});

export const updatePitch = (baseFrequency, frequency, change) => ({
  type: UPDATE_PITCH,
  baseFrequency,
  frequency,
  change
});

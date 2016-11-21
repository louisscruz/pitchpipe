const PITCH_NAMES = [
  'A', 'B♭', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'
];
const STEP_SIZE = 1.0594630943592953;

const getStepNumber = (baseFrequency, frequency) => {
  const a = Math.log(frequency / baseFrequency);
  const b = Math.log(STEP_SIZE);
  return Math.round(a / b) + 49;
};

const getFrequency = (baseFrequency, stepNumber) => {
  return (baseFrequency * (Math.pow(STEP_SIZE, stepNumber - 49)));
};

// For equal temperament:
// (ln(frequency/baseFrequency)/ln(2^(1/12)) + 49
export const frequencyToLetter = (baseFrequency, frequency) => {
  const stepNumber = getStepNumber(baseFrequency, frequency);
  const index = (stepNumber - 1) % 12;
  return PITCH_NAMES[index];
};

export const frequencyToPitchNum = (baseFrequency, frequency) => {
  return PITCH_NAMES.indexOf(frequencyToLetter(baseFrequency, frequency));
};

export const adjustToBaseFrequency = (baseFrequency, frequency) => {
  const stepNumber = getStepNumber(baseFrequency, frequency);
  return getFrequency(baseFrequency, stepNumber);
};

export const nextPitch = (baseFrequency, frequency, change) => {
  if (change === 0) return;
  const currentStep = getStepNumber(baseFrequency, frequency);
  const nextStep = currentStep + change;
  return getFrequency(baseFrequency, nextStep);
};

export const getPitchNames = () => {
  return PITCH_NAMES;
};

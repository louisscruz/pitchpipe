const defaultPlayer = {
  isPlaying: false,
  drone: false,
  hertz: false
};

export default (state = defaultPlayer, action) => {
  Object.freeze(state);
  switch(action.type) {
    default:
      return state;
  }
};

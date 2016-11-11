export default () => next => action => {
  switch(action.type) {
    default:
      return next(action);
  }
};

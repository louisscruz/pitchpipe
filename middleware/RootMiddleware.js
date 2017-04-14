import { applyMiddleware } from 'redux';
import PlayerMiddleware from './PlayerMiddleware';

const RootMiddleware = applyMiddleware(
  PlayerMiddleware
);

export default RootMiddleware;

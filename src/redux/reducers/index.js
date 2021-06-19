import smollinkCurrentUserReducer from './smollinkCurrentUser';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  smollinkCurrentUser: smollinkCurrentUserReducer,
});

export default allReducers;

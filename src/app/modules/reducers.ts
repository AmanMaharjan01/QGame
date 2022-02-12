import { combineReducers } from 'redux';
import AuthReducer from './auth/auth-slice';

const reducers = combineReducers({
  auth: AuthReducer
});

export default reducers;

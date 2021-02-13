import { combineReducers } from 'redux';

import admin from './admin';
import application from './application';
import brand from './brand';

const rootReducer = combineReducers({
  admin,
  application,
  brand,
});
export default rootReducer;

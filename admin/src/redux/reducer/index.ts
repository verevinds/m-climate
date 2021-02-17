import { combineReducers } from 'redux';

import admin from './admin';
import application from './application';
import brand from './brand';
import product from './product';

const rootReducer = combineReducers({
  admin,
  application,
  brand,
  product,
});
export default rootReducer;

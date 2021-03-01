import { combineReducers } from 'redux';

import application from './application';
import geo from './geo';

export default combineReducers({
  application,
  geo,
});

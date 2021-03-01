import { combineReducers } from 'redux';

import geo from './geo';
import tuning from './tuning';

export default combineReducers({
  tuning,
  geo,
});

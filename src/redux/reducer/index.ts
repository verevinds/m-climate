import { combineReducers } from 'redux';

import admin from './admin';
import application from './application';

const rootReducer = combineReducers({
  admin,
  application,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

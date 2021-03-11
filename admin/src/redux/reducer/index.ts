import { combineReducers } from 'redux';

import admin from './admin';
import application from './application';
import banners from './banners';
import brand from './brand';
import portfolio from './portfolio';
import product from './product';
import service from './service';

const rootReducer = combineReducers({
  admin,
  application,
  brand,
  product,
  banners,
  service,
  portfolio,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

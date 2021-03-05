import { combineReducers } from 'redux';

import admin from './admin';
import application from './application';
import banners from './banners';
import brand from './brand';
import geo from './geo';
import product from './product';
import service from './service';

const rootReducer = combineReducers({
  admin,
  application,
  brand,
  product,
  banners,
  service,
  geo,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

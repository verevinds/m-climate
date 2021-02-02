import { combineReducers } from 'redux';
import admin from './admin';

const rootReducer = combineReducers({
    admin
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
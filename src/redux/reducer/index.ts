import { combineReducers } from 'redux';
import clockReducer from './clockSlice';

const rootReducer = combineReducers({
    clock: clockReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
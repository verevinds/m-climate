import {
  configureStore,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Action } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkDispatch } from 'redux-thunk';

import rootReducer, { RootState } from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: (['application'] as Array<keyof RootState>) as string[],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootStateWithPirsist = typeof persistedReducer;

export const initStore = (preloadedState = {}) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: process.env.nodeEnv !== 'production',
    middleware: getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
};
export type StoreWithPersist = ReturnType<typeof initStore>;
export type ThunkActionWithApi<R, S, E, A extends Action> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E,
) => R;

export type AppThunk<R = void, T = string> = ThunkActionWithApi<
  R,
  RootState,
  null,
  Action<T>
>;

// export type AppThunkAction<ArgumentType = undefined> = (
//   ...arg: ArgumentType[]
// ) => AppThunk<Promise<void>>;
export type AppThunkAction<T> = PayloadAction<
  T,
  string,
  {
    arg: void;
    requestId: string;
    requestStatus: 'fulfilled';
  },
  never
>;

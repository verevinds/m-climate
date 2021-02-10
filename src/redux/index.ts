import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useMemo } from 'react';
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

import rootReducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: (['application'] as Array<keyof RootState>) as string[],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = typeof rootReducer;
export type RootStateWithPirsist = typeof persistedReducer;

const initStore = (preloadedState: RootStateWithPirsist = persistedReducer) => {
  return configureStore({
    reducer: preloadedState,
    devTools: true,
    middleware: getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
};
export function useStore(initialState: RootStateWithPirsist) {
  const store = useMemo(() => initStore(initialState), [initialState]);
  return store;
}

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

export type AppThunkAction<ArgumentType = undefined> = (
  ...arg: ArgumentType[]
) => AppThunk<Promise<void>>;

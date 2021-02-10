import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
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

const initStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: true,
    middleware: getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  const storeWithPersist = {
    ...store,
    persist: process.browser && persistStore(store),
  };

  return storeWithPersist;
};

export type StoreWithPersist = ReturnType<typeof initStore>;
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = StoreWithPersist['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

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

export const getStore = (preloadedState = {}): StoreWithPersist => {
  // Always make a new store if server, otherwise state is shared between requests
  if (!process.browser) {
    return initStore(preloadedState);
  }

  return initStore(preloadedState);
};

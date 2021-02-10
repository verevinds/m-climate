import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useMemo } from 'react';
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

let store;
const persistConfig = {
  key: 'root',
  storage,
  whitelist: (['application'] as Array<keyof RootState>) as string[],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function makeStore(initialState: typeof persistedReducer = persistedReducer) {
  return configureStore({
    reducer: initialState,
    devTools: true,
    middleware: getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
}
export const initializeStore = (preloadedState: typeof persistedReducer) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  // eslint-disable-next-line no-underscore-dangle
  let _store = store ?? makeStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};
export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
export type StoreWithPersist = ReturnType<typeof store>;
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = StoreWithPersist['dispatch'];

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

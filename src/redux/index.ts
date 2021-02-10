import { configureStore } from '@reduxjs/toolkit';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import rootReducer from './reducer';

const initStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
    middleware: [thunk],
  });

  const storeWithPersist = {
    ...store,
  };

  return storeWithPersist;
};

export type StoreWithPersist = ReturnType<typeof initStore>;
export type RootState = ReturnType<typeof rootReducer>;

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

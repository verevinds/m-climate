import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducer';

const initStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
  });

  const storeWithPersist = {
    ...store,
  };

  return storeWithPersist;
};

export type StoreWithPersist = ReturnType<typeof initStore>;

export const getStore = (preloadedState = {}): StoreWithPersist => {
  // Always make a new store if server, otherwise state is shared between requests
  if (!process.browser) {
    return initStore(preloadedState);
  }

  return initStore(preloadedState);
};

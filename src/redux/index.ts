import { configureStore } from '@reduxjs/toolkit';
import { IncomingHttpHeaders } from 'http';

import rootReducer from './reducer';

const initStore = (preloadedState = {}, _headers?: IncomingHttpHeaders) => {
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

export const getStore = (
  preloadedState = {},
  headers?: IncomingHttpHeaders,
): StoreWithPersist => {
  // Always make a new store if server, otherwise state is shared between requests
  if (!process.browser) {
    return initStore(preloadedState, headers);
  }

  return initStore(preloadedState, headers);
};

import { configureStore } from '@reduxjs/toolkit'
import { IncomingHttpHeaders } from 'http';
import rootReducer from './reducer'


const initStore = (preloadedState = {}, headers?: IncomingHttpHeaders) => {
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
    headers?: IncomingHttpHeaders
): StoreWithPersist => {
    // Always make a new store if server, otherwise state is shared between requests
    if (!process.browser) {
        return initStore(preloadedState, headers);
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window.__NEXT_REDUX_STORE__) {
        window.__NEXT_REDUX_STORE__ = initStore(preloadedState, headers);
    }
    return window.__NEXT_REDUX_STORE__;
};
import '@src/scss/styles.scss';

import { useStore } from '@redux/index';
import type { AppInitialProps, AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export type AppInitialPropsWithRedux = AppInitialProps &
  AppProps & { err?: Error };

const MyApp = ({ Component, pageProps }: AppInitialPropsWithRedux) => {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default MyApp;

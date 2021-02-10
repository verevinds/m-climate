import '@src/scss/styles.scss';

import { useStore } from '@redux/index';
import { RootState } from '@redux/reducer';
import { IncomingHttpHeaders } from 'http';
import type { AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export type AppInitialPropsWithRedux = AppInitialProps &
  AppProps & {
    initialReduxState: RootState;
    headers?: IncomingHttpHeaders;
    err?: Error;
  };

const MyApp = ({
  Component,
  pageProps,
}: AppInitialPropsWithRedux): React.ReactNode => {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <>
      <Head>
        <title>MClimate</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
          rel='preload'
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default MyApp;

import '@src/scss/styles.scss';
import '@verevinds/ui-kit/dist/styles.global.css';

import Spinner from '@components/Spinner/Spinner';
import withReduxStore from '@lib/with-redux-store';
import { StoreWithPersist } from '@redux/index';
import type { AppInitialProps, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export type AppInitialPropsWithRedux = AppProps &
  AppInitialProps & {
    err?: Error;
    reduxStore: StoreWithPersist;
  };

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this
      .props as AppInitialPropsWithRedux;

    const persistor = persistStore(reduxStore);
    return (
      <>
        <Head>
          <title>MClimate</title>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap'
            rel='preload'
            as='font'
          />
        </Head>
        <Provider store={reduxStore}>
          <PersistGate loading={<Spinner />} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default withReduxStore(MyApp);

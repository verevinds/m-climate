import '@src/scss/styles.scss';
import '@src/scss/font.scss';
import '@verevinds/ui-kit/dist/styles.global.css';

import withReduxStore from '@lib/with-redux-store';
import { AppInitialPropsWithRedux } from '@src/interface';
import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this
      .props as AppInitialPropsWithRedux;

    const persistor = persistStore(reduxStore, {}, () => {
      persistor.persist();
    });
    return (
      <>
        <Head>
          <title>MClimate</title>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default withReduxStore(MyApp);

import '@src/scss/styles.scss';
import '@verevinds/ui-kit/dist/styles.global.css';

import withReduxStore from '@lib/with-redux-store';
import { StoreWithPersist } from '@redux/index';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

export type AppInitialPropsWithRedux = AppProps &
  AppInitialProps & {
    err?: Error;
    reduxStore: StoreWithPersist;
  };
export type AppContextWithStore = AppContext & {
  ctx: AppContext['ctx'];
  reduxStore: StoreWithPersist;
};
const MyApp = (props: AppInitialPropsWithRedux) => {
  const { Component, pageProps, reduxStore } = props;

  const persistor = persistStore(reduxStore, {}, () => {
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
          as='font'
        />
      </Head>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default withReduxStore(MyApp);

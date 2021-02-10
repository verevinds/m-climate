import '@src/scss/styles.scss';

import { getStore } from '@redux/index';
import { RootState } from '@redux/reducer';
import { setContext } from '@redux/reducer/application';
import { getBrands } from '@redux/reducer/brand';
import { IncomingHttpHeaders } from 'http';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

export type AppInitialPropsWithRedux = AppInitialProps &
  AppProps & {
    initialReduxState: RootState;
    headers?: IncomingHttpHeaders;
    err?: Error;
  };

const MyApp = ({
  Component,
  pageProps,
  initialReduxState,
}: AppInitialPropsWithRedux): React.ReactNode => {
  const reduxStore = getStore(initialReduxState);

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
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const headers = ctx.req?.headers ?? {};
  const reduxStore = getStore({});
  const { pathname, query } = ctx;

  const promise = [
    reduxStore.dispatch(setContext({ pathname, query })),
    reduxStore.dispatch(getBrands()) as unknown,
  ];

  await Promise.all(promise);

  return {
    initialReduxState: reduxStore.getState(),
    headers,
  };
};

export default MyApp;

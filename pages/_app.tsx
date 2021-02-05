import Head from 'next/head';
import type { AppContext, AppProps } from 'next/app';
import '@src/scss/styles.scss';

import { Provider, useDispatch } from 'react-redux';

import { store, useAppDispatch } from '@redux/index';
import React from 'react';
import { setContext } from '@redux/reducer/application';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <React.Fragment>
            <Head>
                <title>MClimate</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
                    rel="preload"
                />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </React.Fragment>
    );
};

MyApp.getInitialProps = async ({ ctx: { pathname, query } }: AppContext) => {
    const dispatch = useAppDispatch();
    dispatch(setContext({ pathname, query }));
};

export default MyApp;

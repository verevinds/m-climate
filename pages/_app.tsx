import Head from 'next/head';
import type { AppProps } from 'next/app';
import 'src/scss/styles.scss';

import { Provider } from 'react-redux';

import store from '../src/redux';
import React from 'react';

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
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet"/>
            </Head>
            <Provider store={store}>
                <div className='main'>
                    <Component {...pageProps} />
                </div>
            </Provider>
        </React.Fragment>
    );
};

export default MyApp;

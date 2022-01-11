import React from 'react';

import Head from 'next/head';

import { GlobalStyle } from '@styles';

import '../styles/globals.css';

// import wrapper from '@store/configureStore';

const App = ({ Component, pageProps }: any) => (
  <>
    <Head>
      <meta charSet='utf-8' />
      <title>simple-diary-service</title>
    </Head>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default App;

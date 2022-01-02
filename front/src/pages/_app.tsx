import { GlobalStyle } from '@styles';
import Head from 'next/head';
import React from 'react';

// import wrapper from '@store/configureStore';

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet='utf-8' />
      <title>BoilerPlate</title>
    </Head>
    <GlobalStyle />
    <Component />
  </>
);

export default App;

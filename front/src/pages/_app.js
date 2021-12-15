import React from 'react';

import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { GlobalStyle } from '@styles';

require('../styles/variables.less');

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

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import wrapper from '../store/configureStore';

const HeartGram = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>HeartGram</title>
      </Head>  
      <Component />     
    </>
  );
};

HeartGram.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(HeartGram);
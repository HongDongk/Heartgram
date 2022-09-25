import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

function HeartGram({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>HeartGram ❤</title>
      </Head>
      
      <Component />
    </>
  );
}

HeartGram.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default HeartGram;
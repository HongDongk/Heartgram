import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import { END } from 'redux-saga';


import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import Signupform from '../components/Signupform';
import wrapper from '../store/configureStore';


const Signup = () => {
    return(
       <AppLayout>
            <Head>
                <title>회원가입 | HeartGram</title>
            </Head>
            <Main>
                <Signupform/>
            </Main>
       </AppLayout>
    )

}

export default Signup;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    console.log('getServerSideProps start');
    console.log(req.headers);
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch(END);
    console.log('getServerSideProps end');
    await store.sagaTask.toPromise();
  });

const Main = styled.div`
    width:80%;
    padding:0 17%;
    display:flex;
    justify-content:center;
    justify-content:space-around;
    background-color: #E6E6FA;
`;
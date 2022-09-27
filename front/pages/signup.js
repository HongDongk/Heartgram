import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import Signupform from '../components/Signupform';


const Signup = () => {
    return(
       <AppLayout>
            <Head>
                <title>회원가입 | HeartGram❤</title>
            </Head>
            <Main>
                <Signupform/>
            </Main>
       </AppLayout>
    )

}

export default Signup;

const Main = styled.div`
    width:80%;
    padding:0 17%;
    display:flex;
    justify-content:center;
    justify-content:space-around;
    background-color: #E6E6FA;
`;
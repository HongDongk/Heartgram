import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import styled from 'styled-components';

import Loginform from "../components/Loginform";
import Image from "next/image";
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import Heart from "../img/Heart.png";
import AppLayout from '../components/AppLayout';



const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
    }, []);

    return (
        <AppLayout>
            <Main>
                <Image src={Heart} width={400} height={400}/>
                <Loginform/>
            </Main>
        </AppLayout>        
    );
};

export default Home;

const Main = styled.div`
    width:80%;
    padding:0 16%;
    display:flex;
    justify-content:center;
    justify-content:space-around;
    background-color: #E6E6FA;
`;



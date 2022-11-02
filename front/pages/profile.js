import React from 'react';
import UserProfile from "../components/UserProfile";
import TopMenu from "../components/TopMenu";
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';
import Link from 'next/link';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';



const Profile = () => {
    
    return(
        <Content>
            <TopMenu/>
            <Main>
                <UserProfile/>
                <Text>
                    <div>❤모두의 커뮤니티사이트 하트그램❤</div>
                    <div>게시글을추가하고 사람들과 소통해보세요!!</div>
                </Text>          
                <Plus><Link href="/postupdate"><SLink>게시글 업로드</SLink></Link></Plus>
            </Main>          
        </Content>
    );
};

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

export default Profile;



const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
    overflow-x: hidden;
`;
const Main = styled.div`
    height: calc(100vh - 70px);
    padding-top:60px;
`;
const Text = styled.div`
    font-size:17px;
    margin-top: 30px;
    text-align:center;
`;
const SLink = styled.a`
    background-color:#1E90FF;
    border-radius:10px;
    padding:10px;
    font-size:17px;
    font-weight:lighter;
    color:white;
`;
const Plus = styled.div`
    margin-top:50px;
    text-align:center;
`;




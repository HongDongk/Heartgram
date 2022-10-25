import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import styled from 'styled-components';
import axios from 'axios';

import TopMenu from '../../components/TopMenu';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import PostCard from '../../components/PostCard';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

const Post = () => {
    
    const { singlePost } = useSelector((state) => state.post);
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <Head>
                <title>
                    {singlePost.User.nickname} 님의 글
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://Heargram.com/favicon.ico'} />
                <meta property="og:url" content={`https://Heargram.com/post/${id}`} />
            </Head>
            <Content>
                <TopMenu/>
                <MainContent>
                    <PostCard post={singlePost} />
                </MainContent>
            </Content>              
        </div>     
    );
};

const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
    overflow-x: hidden;
`;

const MainContent = styled.div`
    width:1050px;
    padding: 50px 200px;
    min-height:calc(100vh - 70px);
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
        type: LOAD_POST_REQUEST,
        data: params.id,
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
  });

export default Post;
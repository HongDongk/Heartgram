import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { END } from 'redux-saga';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

import modal from '../../hooks/modal';
import { LOAD_POSTS_REQUEST, LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';

const User = () => {
    
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const { userInfo, me } = useSelector((state) => state.user);
    const [ref, inView] = useInView();

    const [open2, showModal2, handleOk2, handleCancel2] = modal(false);
    const [open3, showModal3, handleOk3, handleCancel3] = modal(false);

    useEffect(
        () => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            dispatch({
                type: LOAD_POSTS_REQUEST,
                lastId,
                data: id,
            });
        }
        },
        [inView, hasMorePosts, loadPostsLoading, mainPosts, id],
    );

    return (
        <div>
            {userInfo && (
                <Head>
                    <title>
                        {userInfo.nickname} 님의 글
                    </title>
                    <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:image" content="https://Heargram.com/favicon.ico" />
                    <meta property="og:url" content={`https://Heargram.com/user/${id}`} />
                </Head>
            )}
            {userInfo && (userInfo.id !== me?.id) ? (
                <div>
                    <Avatar>{userInfo.nickname[0]}</Avatar>
                    <Email>{userInfo.email}</Email>
                    
                </div>             
            ) : null}
            {mainPosts.map((c) => (<PostCard key={c.id} post={c} />))}
            <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: params.id,
    });
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
        type: LOAD_USER_REQUEST,
        data: params.id,
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default User;

const Avatar = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100px;
    height:100px;
    border-radius:50%;
    background-color:gray;
    font-weight:bold;
    font-size:20px;
    &:hover{  
        cursor: pointer;
    }
`;
const Email =styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    font-weight:bold;
`;
const Info = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    justify-content:space-around;
    width:50%;
`;
const Sbutton = styled.div`
    border: 0;
    outline: 0;
    &:hover{  
        cursor: pointer;
    }
`;
const Count = styled.span`
    font-weight:bold;
    &:hover{  
        cursor: pointer;
    }
`;
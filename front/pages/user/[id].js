import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

import TopMenu from "../../components/TopMenu";
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';

const User = () => {
    
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const { userInfo } = useSelector((state) => state.user);
    const [ref, inView] = useInView();

    useEffect(
        () => {
        if (inView && hasMorePosts && !loadPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            dispatch({
                type: LOAD_USER_POSTS_REQUEST,
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
                        {userInfo.nickname} 님의 프로필
                    </title>
                    <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
                    <meta property="og:image" content="https://Heargram.com/favicon.ico" />
                    <meta property="og:url" content={`https://Heargram.com/user/${id}`} />
                </Head>
            )}
            {userInfo ? (
                <Content>
                    <TopMenu/>
                    <UserInfo>
                        <Profile>
                            <Avatar>{userInfo.nickname[0]}</Avatar>
                            <Email>{userInfo.email}</Email>
                            <Info>
                                <Sbutton><Count>{userInfo.Posts}</Count> 게시글</Sbutton>
                                <Sbutton><Count>{userInfo.Followings}</Count> 팔로잉</Sbutton>
                                <Sbutton><Count>{userInfo.Followers}</Count> 팔로워</Sbutton>                     
                            </Info>      
                        </Profile>
                    </UserInfo>
                    <PostBox>
                        <Title>❤{userInfo.nickname}님의 게시글❤</Title>             
                        {mainPosts.length !== 0 ? (
                                <MainContent>
                                    {mainPosts.map((c) => (<PostCard key={c.id} post={c} />))}
                                    <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
                                </MainContent>          
                            ) : <NoPost>아직 게시글이 없네요!!😥</NoPost> }
                    </PostBox>       
                </Content>
               
            ): null } 
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

const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
    overflow-x: hidden;
`;
const UserInfo = styled.div`
    display:flex;
    justify-content:center;
    margin-top:40px;
    width:100%;
`;
const Profile = styled.div`
    padding-top:50px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:550px;
    height:350px;
    background-color: whitesmoke;
`;
const PostBox = styled.div`
    width:100%;
    background-color:#F8F8FF;
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
`;
const Title = styled.div`
    height:70px;
    font-size:17px;
    font-weight:bold;
    width:100%;
    text-align:center;
    line-height:70px;
`;
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

const NoPost = styled.div`
    font-size:30px;
    height:calc(100vh - 530px);
    line-height: calc(100vh - 530px);
`;

const MainContent = styled.div`
    width:1050px;
    margin-top:10px;
    padding-bottom:50px;
    padding: 0 200px;
    min-height:calc(100vh - 70px);
`;
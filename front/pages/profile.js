import React, { useEffect } from 'react';
import UserProfile from "../components/UserProfile";
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import TopMenu from "../components/TopMenu";
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';

import MyPostCard from '../components/MyPostCard';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';



const Profile = () => {
    
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const [ref, inView] = useInView();

    useEffect(
      () => {
          if (inView && hasMorePosts && !loadPostsLoading) {
              const lastId = mainPosts[mainPosts.length - 1]?.id;
              dispatch({
                  type: LOAD_POSTS_REQUEST,
                  lastId,
              });
          }
      },
      [inView, hasMorePosts, loadPostsLoading, mainPosts],
    );
    
    return(
        <Content>
            <TopMenu/>           
            <UserProfile/>      
        </Content>
    );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    store.dispatch(END);
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

const MainContent = styled.div`
    width:1050px;
    padding: 50px 200px;
    min-height:calc(100vh - 70px);
`;


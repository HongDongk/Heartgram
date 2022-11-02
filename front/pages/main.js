import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled  from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { END } from 'redux-saga';
import axios from 'axios';

import PostCard from '../components/PostCard';
import TopMenu from "../components/TopMenu";
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';


const Main = () => {
    
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
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
    
    useEffect(() => {
        if (retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);

    return(
            <Content>
                <TopMenu/>
                <MainContent>
                    {mainPosts.map((c) => (<PostCard key={c.id} post={c} />))}
                    <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
                </MainContent>   
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
  

export default Main;

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



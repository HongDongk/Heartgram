import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled  from 'styled-components';
import { useInView } from 'react-intersection-observer';

import PostCard from '../components/PostCard';
import TopMenu from "../components/TopMenu"
import { LOAD_POSTS_REQUEST } from '../reducers/post';


const Main = () => {
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
                <MainContent>
                    {mainPosts.map((c) => (<PostCard key={c.id} post={c} />))}
                    <div ref={hasMorePosts && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
                </MainContent>
                
            </Content>   
    );
};

export default Main;

const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
    overflow-x: hidden;
`;

const MainContent = styled.div`
    width:100%;
    padding: 70px 200px;
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
`;



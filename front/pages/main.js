import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

import PostCard from '../components/PostCard';
import TopMenu from "../components/TopMenu"
import { LOAD_POSTS_REQUEST } from '../reducers/post';


const Main = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePost, loadPostsLoading } = useSelector((state) => state.post);
    const [ref, inView] = useInView();

    useEffect(
        () => {
        if (inView && hasMorePost && !loadPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            dispatch({
                type: LOAD_POSTS_REQUEST,
                lastId,
            });
        }
        },
        [inView, hasMorePost, loadPostsLoading, mainPosts],
    );

    return(
        
        <Content>
             <TopMenu/>
             {mainPosts.map((c) => (<PostCard key={c.id} post={c} />))}
             <div ref={hasMorePost && !loadPostsLoading ? ref : undefined} style={{ height: 10 }} />
        </Content>
       
    )

}

export default Main;

const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
`;



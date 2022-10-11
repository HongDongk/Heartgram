import React, { useEffect } from 'react';
import styled, { createGlobalStyle }  from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import TopMenu from "../components/TopMenu"
import PostForm from "../components/Postform";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Postupdate = () => {


    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(
        () => {
        if (hasMorePosts && !loadPostsLoading) {
            const lastId = mainPosts[mainPosts.length - 1]?.id;
            dispatch({
                type: LOAD_POSTS_REQUEST,
                lastId,
            });
        }
        },
        [hasMorePosts, loadPostsLoading, mainPosts],
    );


    return(
        <Content>
             <TopMenu/>
             <PostForm/>
        </Content>       
    )

}

export default Postupdate;

const Content = styled.div`
    background-color: #E6E6FA;
`;

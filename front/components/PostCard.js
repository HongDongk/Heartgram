import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';


import { REMOVE_POST_REQUEST } from '../reducers/post';


const PostCard = ({ post }) => {
    
  
    return (
        <CardWrapper>
          <User>{post.User.nickname}</User>
          <SCard 
            cover={ <PostImages images={post.Images} /> }
            actions={[
                <RetweetOutlined key="retweet" />,
            ]}>
            
              <Card.Meta
                description={<PostCardContent postData={post.content} />}
              />
              
            
          </SCard>
        </CardWrapper>

    );
};


PostCard.propTypes = {
  post: PropTypes.shape({
      id: PropTypes.string,
      User: PropTypes.object,
      UserId: PropTypes.number,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;

const CardWrapper = styled.div`
    margin-bottom:25px;
    background-color:white;
    padding:0 20px;
    border-radius:10px;
`;

const User = styled.div`
    font-weight:bold;
    height:50px;
    padding-top: 12px;
    padding-left: 10px;
`;

const SCard = styled(Card)`
    display:block;
    width:100%;
    border:none;
`;

const Meta = styled(Card.Meta)`
  
`
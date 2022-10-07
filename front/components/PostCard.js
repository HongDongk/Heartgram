import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import PostImages from './PostImages';


import { REMOVE_POST_REQUEST } from '../reducers/post';

const CardWrapper = styled.div`
    margin-bottom:25px;
    border: 1px solid red;
`;

const PostCard = ({ post }) => {
    
  
    return (
        <CardWrapper>
          <SCard 
            cover={ <PostImages images={post.Images} /> }>
          </SCard>
        </CardWrapper>

    );
};


PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    UserId: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;

const SCard = styled(Card)`

`;
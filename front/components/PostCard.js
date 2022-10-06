import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';


import { REMOVE_POST_REQUEST } from '../reducers/post';

const CardWrapper = styled.div`
  width:60%;
`;

const PostCard = ({ post }) => {
    
  
    return (
        <CardWrapper>
          <SCard 
            cover={ <img src ={post.Images[0].src} />  }>
          </SCard>
        </CardWrapper>

    );
};
 

export default PostCard;

const SCard = styled(Card)`
  width:500;
  border: 1px solid red;

`;
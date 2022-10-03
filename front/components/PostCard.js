import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';


import { REMOVE_POST_REQUEST } from '../reducers/post';

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = () => {
    
    return (
        <>Fuckyou</>
    );
};


export default PostCard;
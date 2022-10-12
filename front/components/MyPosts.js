import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';


import { REMOVE_POST_REQUEST } from '../reducers/post';


const MyPosts = () => {
    
    const dispatch = useDispatch();
    const { removePostLoading } = useSelector((state) => state.post);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [liked, setLiked] = useState(false);
    const { me } = useSelector((state) => state.user);
    const id = me && me.id;

    const onToggleLike = useCallback(() => {
      setLiked((prev) => !prev);
    }, []);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
      dispatch({
          type: REMOVE_POST_REQUEST,
          data: post.id,
      });
    }, []);

    return (
        <CardWrapper>
          <User><a><Avatar>{post.User.nickname[0]}</Avatar></a>&nbsp;&nbsp;&nbsp;{post.User.nickname}</User>
          <SCard 
            cover={ <PostImages images={post.Images} /> }
            actions={[
                <RetweetOutlined key="retweet" />,
                liked
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                : <HeartOutlined key="heart" onClick={onToggleLike} />,
                <MessageOutlined key="message" onClick={onToggleComment} />,
                <Popover
                  key="ellipsis"
                  content={(
                    <Button.Group>
                      {id && post.User.id === id
                        ? (
                          <>
                            <Button>수정</Button>
                            <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                          </>
                        )
                        : <Button>신고</Button>}
                    </Button.Group>
                  )}
                >
                  <EllipsisOutlined />
                </Popover>,
            ]}>
            <Card.Meta
              description={<PostCardContent postData={post.content} />}
            />
          </SCard>
          {commentFormOpened && (
              <>
                <CommentForm post={post} />
                <SList
                  header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                  itemLayout="horizontal"
                  dataSource={post.Comments || []}
                  renderItem={(item) => (
                    <li>
                      <Comment
                        author={item.User.nickname}
                        avatar={(
                          <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                            <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                          </Link>
                        )}
                        content={item.content}
                      />
                    </li>
                  )}
                />
              </>
          )}
        </CardWrapper>

    );
};

export default MyPosts;

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
    margin-bottom: 15px;
    padding-left: 8px;
`;

const SCard = styled(Card)`
    display:block;
    border:none;
`;

const SList = styled(List)`
    margin-left:8px;
`;
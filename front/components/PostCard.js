import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Avatar, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import moment from 'moment';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST, UPDATE_POST_REQUEST } from '../reducers/post';


const PostCard = ({ post }) => {
    
    const dispatch = useDispatch();
    const { removePostLoading } = useSelector((state) => state.post);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const { me } = useSelector((state) => state.user);
    const id = me && me.id;
    const [editMode, setEditMode] = useState(false);
    
    const liked = post.Likers.find((v) => v.id === id);

    const onLike = useCallback(() => {
        if (!id) {
          return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        });
    }, [id]);
    
    const onUnlike = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        });
    }, [id]);

    const onClickUpdate = useCallback(() => {
      setEditMode(true);
    }, []);

    const onCancelUpdate = useCallback(() => {
      setEditMode(false);
    }, []);

    const onChangePost = useCallback((editText) => () => {
      dispatch({
          type: UPDATE_POST_REQUEST,
          data: {
              PostId: post.id,
              content: editText,
          },
      });
    }, [post]);
    
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, [id]);

    const onRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id]);
  

    return (
        <CardWrapper>
          <User>
            <Link href={`/user/${post.User.id}`} prefetch={false}><a><Avatar>{post.User.nickname[0]}</Avatar>&nbsp;&nbsp;&nbsp;{post.User.nickname}</a></Link>
            {id && <FollowButton post={post} />}      
          </User>
          <SCard 
            cover={ <PostImages images={post.Images} /> }
            actions={[
                <RetweetOutlined key="retweet" onClick={onRetweet}/>,
                liked
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
                : <HeartOutlined key="heart" onClick={onLike} />,
                <MessageOutlined key="message" onClick={onToggleComment} />,
                <Popover
                  key="ellipsis"
                  content={(
                    <Button.Group>
                      {id && post.User.id === id
                        ? (
                          <>
                            {!post.RetweetId && <Button onClick={onClickUpdate}>수정</Button>}
                            <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                          </>
                        )
                        : <Button>신고</Button>}
                    </Button.Group>
                  )}
                >
                  <EllipsisOutlined />
                </Popover>,
            ]}
            title={post.RetweetId ? `${post.User.nickname}님이 리포스트하셨습니다.` : null}
          >
             {post.RetweetId && post.Retweet? (
                <RetweetBox>
                    <User><Link href={`/user/${post.Retweet.User.id}`} prefetch={false}><a><Avatar>{post.Retweet.User.nickname[0]}</Avatar>&nbsp;&nbsp;&nbsp;{post.Retweet.User.nickname}</a></Link></User>
                    <SCard cover={ <PostImages images={post.Retweet.Images} /> }>
                      <Card.Meta 
                        description={<div><PostCardContent postData={post.Retweet.content} /></div>}
                      />
                    </SCard>
                </RetweetBox>   
              ) : (
                <Card.Meta
                  description={<div>
                                  <PostCardContent editMode={editMode} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} postData={post.content}/>
                                  <Liker>👍 &nbsp;{post.Likers ? post.Likers.length : 0}개</Liker>
                                  <Date>{moment(post.createdAt).format('YYYY.MM.DD')}</Date>
                               </div>
                               }
                />
              )}
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
                          <Link href={`/user/${item.User.id}`} prefetch={false}>
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


PostCard.propTypes = {
  post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      UserId: PropTypes.number,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Likers: PropTypes.arrayOf(PropTypes.object),
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
  display:flex;
  justify-content:space-between;
  font-weight:bold;
  height:50px;
  padding-top: 12px;
  margin-bottom: 10px;
  padding-left: 8px;
  & > a{
      font-size:13px;
  }
`;

const Date = styled.div`
    margin-top:8px;
`;

const SCard = styled(Card)`
    display:block;
    border:none;
`;

const SList = styled(List)`
    margin-left:8px;
`;

const RetweetBox= styled.div`
    padding: 15px;
    background-color:#F8F8FF;
    border-radius:10px;
`;

const Liker= styled.div`
    color: black;
    margin-top:50px;
`; 


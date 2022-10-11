import { Form, Input, Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

function CommentForm({ post }) {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) { 
            setCommentText('');
        }
    }, [addCommentDone]);

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
        <Form.Item style={{ position: 'relative', margin: 0 }}>
            <SInput value={commentText} onChange={onChangeCommentText} rows={4} />
            <Button
                style={{ position: 'absolute', right: 8, bottom: -40, zIndex: 1 }}
                type="primary"
                htmlType="submit"
                loading={addCommentLoading}
            >댓글쓰기</Button>
        </Form.Item>
        </Form>
    );
}

CommentForm.propTypes = {
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

export default CommentForm;

const SInput= styled(Input.TextArea)`
    width:100%;
    border-radius:10px;
`;
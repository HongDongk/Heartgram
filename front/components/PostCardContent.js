import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';

const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => {

    const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
    const [editText, setEditText] = useState(postData);

    useEffect(() => {
        if (updatePostDone) {
            window.location.reload() ;
        }
    }, [updatePostDone]);

    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    });
    
    return(
        <div>
            {editMode ? 
                (<>
                    <SInput rows={4} value={editText} onChange={onChangeText} />
                    <ButtonGroup>
                        <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
                        <Button type="danger" onClick={onCancelUpdate}>취소</Button>
                    </ButtonGroup>
                 </> ) : 
                (<CardContent>
                        {postData.split(/(#[^\s#]+)/g).map((v) => {
                        if (v.match(/(#[^\s]+)/)) {
                            return (    
                                    <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}>
                                        <SLink>{v}</SLink>
                                    </Link>    
                            );
                        }
                            return v;
                        })}
                </CardContent>)
            }
        </div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    onChangePost: PropTypes.any,
    onCancelupdate: PropTypes.any,
};

PostCardContent.defaultProps = {
    editMode: false,
};

export default PostCardContent;

const CardContent = styled.div`
    color: black;
`;    

const SLink = styled.a`
    font-size:17px;
    color: #1E90FF;
    :hover{  
        color:#E6E6FA;
    }
`;

const ButtonGroup = styled.div`
    display:flex;
    width:125px;
    justify-content:space-between;
    margin-top:10px;
    float:right;
`;

const SInput= styled(Input.TextArea)`
    width:600px;
    border-radius:10px;
`;

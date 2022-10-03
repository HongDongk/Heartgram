import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ADD_POST_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
    
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput('');
    const { imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);

    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    useEffect(() => {
      if (addPostDone) {
        setText('');
      }
    }, [addPostDone]);

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('게시글을 작성하세요.');
        }
        return dispatch({
            type: ADD_POST_REQUEST,
            data: text,
        });
    }, [text]);

    return (
      <SForm encType="multipart/form-data" onFinish={onSubmit}>
        <SInput autoSize={{ minRows: 5 }} maxLength={500} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
        <div>
          <input type="file" multiple hidden ref={imageInput} />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>
          <Button type="primary" htmlType="submit" loading={addPostLoading}>짹짹</Button>
        </div>
        <div>
          {imagePaths.map((v) => (
            <div key={v}>
              <img src={`http://localhost:3000/main/${v}`} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          ))}
        </div>
      </SForm>
    );
};

export default PostForm;

const SForm =styled(Form)`
    margin-top:50px;
    width:700px;
    height:200px;
`;

const SInput= styled(Input.TextArea)`
    width:700px;
    border-radius:10px;
`
import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import useInput from '../hooks/useInput';
import { backUrl } from '../config/config';

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
            return alert('게시글을 작성해주세요!!');
        }
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p);
        });
        formData.append('content', text);
        return dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    }, []);
  

    return (
      <SForm encType="multipart/form-data" onFinish={onSubmit}>
        <SInput autoSize={{ minRows: 6 }} maxLength={850} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
        <div>
          <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
          <ButtonBox>
            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
            <Button type="primary" htmlType="submit" loading={addPostLoading}>올리기</Button>
          </ButtonBox>
        </div>
        <Preview>
          {imagePaths.map((v,i) => (
            <Items key={v}>
              <img src={`${backUrl}/${v}`} style={{ width: '200px'}} alt={v} />
              <Cancel>
                <Button onClick={onRemoveImage(i)}>취소</Button>
              </Cancel>
            </Items>
          ))}
        </Preview>
      </SForm>
    );
};

export default PostForm;

const SForm =styled(Form)`
    text-align:center;
    width:100vw;
    padding-top:50px;
    padding-bottom:20px;
    background-color:#F8F8FF;
`;

const SInput= styled(Input.TextArea)`
    width:40%;
    border-radius:10px;
`;

const ButtonBox = styled.div`
    margin-top:30px;
    width:70%;
    display:flex;
    justify-content:end;
`;

const Preview = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    width:100vw;
    padding:15px 15%;
    margin-top:10px;
`;

const Items = styled.div`
    margin-left: 15px;
    
`;


const Cancel = styled.div`
    margin-top:10px;
`;


import { Form, Input, Button} from 'antd';
import React, {useCallback, useEffect,} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const UserEditForm = () => {

    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const { me } = useSelector((state) => state.user);

    const { changeNicknameLoading, changeNicknameDone } = useSelector((state) => state.user);

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
    }, [nickname]);
    
    useEffect(() => {
        if (changeNicknameDone) {
          setText('');
        }
    }, [changeNicknameDone]);


    return (
        <FormWrapper onFinish={onSubmit} layout="vertical" autoComplete="off">
                <Form.Item label="이메일 수정" name="changeemail">
                    <SInput 
                        name="user-email" 
                        placeholder= {me.email} 
                        type="email" 
                        value={email} 
                        onChange={onChangeEmail} 
                    />
                </Form.Item>
                <Form.Item label="비밀번호 수정" name="changepassword">
                    <SInput 
                        name="user-password" 
                        placeholder={me.password} 
                        type="password" 
                        value={password} 
                        onChange={onChangePassword} 
                    />
                </Form.Item>
                <Form.Item label="닉네임 수정" name="changenickname">
                    <SInput 
                        name="user-nickname" 
                        placeholder={me.nickname} 
                        type="string" 
                        value={nickname} 
                        onChange={onChangeNickname} 
                    />
                </Form.Item>
                <Submit type="primary" loading={changeNicknameLoading} htmlType="submit">수정하기</Submit>      
        </FormWrapper>
    );
};

export default UserEditForm;

const SInput=styled(Input)`
    width:350px;
    border-radius:6px;  
`;

const Submit=styled(Button)`
    width:350px;
    border-radius:6px;
    font-weight:500;
`;

const FormWrapper=styled(Form)`
    width:350px;
`;


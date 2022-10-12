import { Form, Input, Button} from 'antd';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../hooks/useInput';

const UserEditForm = () => {

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const { me } = useSelector((state) => state.user);

    const onSubmitForm = useCallback(() => {
       
    }, [email, password]);


    return (
        <FormWrapper onFinish={onSubmitForm} layout="vertical"  autoComplete="off">
                <Form.Item label="이메일바꾸기" name="changeemail">
                    <SInput 
                        name="user-email" 
                        placeholder={me.email} 
                        type="email" 
                        value={email} 
                        onChange={onChangeEmail} 
                    />
                </Form.Item>
                <Form.Item label="비밀번호바꾸기" name="changepassword">
                    <SInput 
                        name="user-password" 
                        placeholder={me.password} 
                        type="password" 
                        value={password} 
                        onChange={onChangePassword} 
                    />
                </Form.Item>
                <Form.Item label="닉네임바꾸기" name="changenickname">
                    <SInput 
                        name="user-nickname" 
                        placeholder={me.nickname} 
                        type="string" 
                        value={nickname} 
                        onChange={onChangeNickname} 
                    />
                </Form.Item>
                <Submit type="primary" htmlType="submit">수정하기</Submit>      
        </FormWrapper>
    );
};

export default UserEditForm;

const SInput=styled(Input)`
    width:300px;
    border-radius:6px;  
`;

const Submit=styled(Button)`
    width:300px;
    border-radius:6px;
    font-weight:500;
`;

const FormWrapper=styled(Form)`
    width:300px;
`;
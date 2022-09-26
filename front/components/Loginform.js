import { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import useInput from '../hooks/useInput';
import styled from 'styled-components';


const Loginform = () => {

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
    }, [email, password]);


    return(
        <Form onFinish={onSubmitForm}  autoComplete="off">
            <div>
                <Input 
                    name="user-email" 
                    placeholder="이메일" 
                    type="email" 
                    value={email} 
                    onChange={onChangeEmail} 
                    required 
                />
            </div>
            <div>
                <Input 
                    name="user-password" 
                    placeholder="비밀번호" 
                    type="password" 
                    value={password} 
                    onChange={onChangePassword} 
                    required
                />
            </div>
            <Button type="primary" htmlType="submit">Login</Button>
        </Form>
    );

}

export default Loginform;

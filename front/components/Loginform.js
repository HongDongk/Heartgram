import { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import Link from 'next/link';
import Router from "next/router";


const Loginform = () => {

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        Router.push("/main");
    }, [email, password]);


    return(
        
        <Content>
            <Logo>HeartGram</Logo>
            <FormWrapper onFinish={onSubmitForm}  autoComplete="off">
            <div>
                <SInput 
                    name="user-email" 
                    placeholder="이메일" 
                    type="email" 
                    value={email} 
                    onChange={onChangeEmail} 
                    required 
                />
            </div>
            <div>
                <SInput 
                    name="user-password" 
                    placeholder="비밀번호" 
                    type="password" 
                    value={password} 
                    onChange={onChangePassword} 
                    required
                />
            </div>
            <div><Submit type="primary" htmlType="submit">Login</Submit></div>       
        </FormWrapper>
        <Box><div>Don't have an account?&nbsp;&nbsp;&nbsp;&nbsp;</div><Link href="/signup"><a>Sign up</a></Link></Box>
    
        </Content>
    );  
}

export default Loginform;

const Content = styled.div`
    width:400px;
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    border-radius:8px;
    background-color:white;
`;

const Logo = styled.div`
    padding-top:20px;
    height:90px;
    text-align:center;
    font-size: 50px;
    font-weight: bold;
    font-family: 'Lobster', cursive;
    &:hover{  
        cursor: pointer;
    }

`
const FormWrapper=styled(Form)`
    width:300px;
    padding:20px 0; 
    height:170px;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    
`;

const SInput=styled(Input)`
    width:250px;
    border-radius:6px;  
    margin-top:10px;
`;
const Submit=styled(Button)`
    margin-top:35px;
    width:250px;
    border-radius:6px;
    font-weight:500;
`;

const Box=styled.div`
    display:flex;
    justify-content:center;  
    height:40px; 
`;
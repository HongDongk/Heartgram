import React, { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import Link from 'next/link';
import { Form, Input, Checkbox, Button } from 'antd'
import Router from "next/router";


const Signupform = () => {

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        window.alert("회원가입이 완료되었습니다!");
        Router.push("/");
    }, [email, password, passwordCheck, term]);


    return(
        
        <Content>
            <Logo>HeartGram</Logo>
            <Info>Sign up to see photos and videos<br/>from your friends.</Info>
            <FormWrapper onFinish={onSubmit}  autoComplete="off">
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
                        name="user-nick" 
                        placeholder="닉네임" 
                        value={nickname} 
                        onChange={onChangeNickname} 
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
                <div>
                    <SInput 
                        name="user-password-check" 
                        placeholder="비밀번호체크" 
                        type="password" 
                        value={passwordCheck} 
                        onChange={onChangePasswordCheck} 
                        required
                    />
                {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <Check>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>Dongkeun을 기억해주세요</Checkbox>
                    {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                </Check>
                <div><Submit type="primary" htmlType="submit">SignUp</Submit></div>       
            </FormWrapper>
            <Box><div>Have an account? &nbsp;&nbsp;&nbsp;&nbsp;</div><Link href="/"><a>Log In</a></Link></Box>
        </Content>
    );  
}

export default Signupform;

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
`;
const Info = styled.div`
    width:300px;
    text-align:center;
    margin-top:15px;
    font-weight:bold;
    color:gray;
`;
const FormWrapper=styled(Form)`
    width:300px;
    margin-top:17px;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
`;
const SInput=styled(Input)`
    margin-top:10px;
    width:250px;
    border-radius:6px;  
`;
const Submit=styled(Button)`
    margin-top:22px;
    width:250px;
    border-radius:6px;
    font-weight:500;
`;
const Check=styled.div`
    margin-top:13px;
    width:245px;
`;
const Box=styled.div`
    margin-top:15px;
    display:flex;
    justify-content:center;  
    height:40px; 
`;
const ErrorMessage = styled.div`
  color: red;
`;
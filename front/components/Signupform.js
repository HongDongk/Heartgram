import React, { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import Link from 'next/link';
import { Form, Input, Checkbox, Button } from 'antd'


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
    console.log(email, nickname, password);
  }, [email, password, passwordCheck, term]);


    return(
        
        <Content>
            <Logo>HeartGram</Logo>
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
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>저를 채용하시겠습니까?</Checkbox>
                {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
            </div>
            <div><Submit type="primary" htmlType="submit">Login</Submit></div>       
        </FormWrapper>
        <Box><div>Have an account? &nbsp;&nbsp;&nbsp;&nbsp;</div><Link href="/"><a>Login</a></Link></Box>
    
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

`
const FormWrapper=styled(Form)`
    width:300px;
    padding:20px 0; 
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    
`;

const SInput=styled(Input)`
    width:250px;
    border-radius:6px;  
`;
const Submit=styled(Button)`
    margin-top:22px;
    width:250px;
    border-radius:6px;
    font-weight:500;
`;

const Box=styled.div`
    display:flex;
    justify-content:center;  
    height:40px; 
`;

const ErrorMessage = styled.div`
  color: red;
`;
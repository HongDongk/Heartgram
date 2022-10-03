import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import styled, { createGlobalStyle }  from 'styled-components';
import { Input } from 'antd';
import { HomeFilled , UserOutlined, HeartOutlined, PlusSquareOutlined } from '@ant-design/icons';

import { LOG_OUT_REQUEST } from '../reducers/user';


const Global = createGlobalStyle`
   a {
        color: #696969;
        text-decoration: none;
        font-weight:bold;
        font-size:25px;
    }
    a:hover{  
        color: #696969;
    }

`;

const TopMenu = () => {

    const { me } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    
    return (
        <div>
            <Global/>
            <Top mode="horizontal">
                <TopItem><Logo>HeartGram</Logo></TopItem>
                <TopItem>
                    <SearchBox placeholder="Find new friend" size="large"/>
                </TopItem>
                <Util>
                  <TopItem><Link href="/main"><a><HomeFilled /></a></Link></TopItem>
                  <TopItem><Heart /></TopItem>
                  <TopItem><Link href="/main"><a><PlusSquareOutlined /></a></Link></TopItem>
                  <TopItem><Link href="/profile"><a><UserOutlined /></a></Link></TopItem>      
                </Util>  
                <LogIn>{me && <SButton onClick={onLogout}><Link href="/"><Sa>LogOut</Sa></Link></SButton>}</LogIn>     
            </Top>
        </div>
    );
};

export default TopMenu;

const Top = styled.div`
    width:100vw;
    height:70px;
    padding: 0 15%;
    display:flex;
    justify-content:center;
    justify-content:space-between;
    align-items:center;
    background-color: whitesmoke;
    border-bottom: 1px solid #DCDCDC;
`;

const TopItem = styled.div`

`;
const SearchBox = styled(Input.Search)`
    width:300px;
    
`;
const Util = styled.div`
    width:200px;
    min-width:150px;
    display:flex;
    justify-content:center;
    justify-content:space-between;
    align-items:center;
`;
const LogIn = styled.div`
    width:100px;
    display:flex;
    justify-content:flex-end;
`;
const SButton = styled.button`
    border: none;
    background-color:whitesmoke;
    &:hover{  
        cursor: pointer;
    }
`;
const Sa = styled.a`
    font-size:20px;
    color: #696969;
`;
const Logo = styled.div`
    font-size:30px;
    font-weight: bold;
    font-family: 'Lobster', cursive;
    &:hover{  
        cursor: pointer;
    }
`;
const Heart = styled(HeartOutlined)`
    margin-top:4px;
    font-size:25px;
    color:#696969;
    &:hover{  
        cursor: pointer;
    }
`;
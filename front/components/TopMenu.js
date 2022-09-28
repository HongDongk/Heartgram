import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import styled, { createGlobalStyle }  from 'styled-components';
import { Input } from 'antd';
import { HomeFilled , UserOutlined, HeartOutlined, PlusSquareOutlined } from '@ant-design/icons';


const Global = createGlobalStyle`
   a {
        color: #696969;
        text-decoration: none;
        font-weight:bold;
        font-size:25px;
    }
`;

const TopMenu = () => {
    
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
            </Top>
        </div>
    );
};

TopMenu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TopMenu;

const Top = styled.div`
    width:100vw;
    height:70px;
    padding: 0 25%;
    display:flex;
    justify-content:center;
    justify-content:space-between;
    align-items:center;
    background-color:#E6E6FA;
    border-bottom: 1px solid #DCDCDC;
`;

const TopItem = styled.div`

`;

const SearchBox = styled(Input.Search)`
    width:300px;
    bordered: 8px;
    
`;

const Util = styled.div`
    width:18%;
    display:flex;
    justify-content:center;
    justify-content:space-between;
    align-items:center;

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
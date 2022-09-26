import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import styled from 'styled-components';
import { Menu, Input } from 'antd';


const AppLayout = () => {
    
    return (
        <Header>
            <Menuu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>HeartGram</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>Profile</a></Link></Menu.Item>
                <Menu.Item key="aboutme"><Link href="/aboutme"><a>About me</a></Link></Menu.Item>
                <Menu.Item key="aboutme"><Link href="/aboutme"><a>About me</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menuu>
        </Header>
        
     
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;

const Header = styled.div`
    width:100vw;
    display: flex;
    justify-content:center;

`
const Menuu = styled(Menu)`
    width:100%;
    display: flex;
    justify-content:center;
    justify-content:space-around;
    font-weight:bold;
`

const Search = styled(Input)`
`
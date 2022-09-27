import React from 'react';
import PropTypes from 'prop-types'
import Link from 'next/link';
import styled, { createGlobalStyle }  from 'styled-components';

const Global = createGlobalStyle`
    a {
        color: #696969;
        text-decoration: none;
        font-weight:bold;
    }
`;


const AppLayout = ({ children }) => {
    
    return (
        <Content>
            <Global/>
            {children}
            <Footer>
                <div><a href="https://blog.naver.com/hongdongk" target="_blank" rel="noreferrer noopener">Blog</a></div>
                <div><a href="https://github.com/HongDongk" target="_blank" rel="noreferrer noopener">GitHub</a></div>
                <div><Link href="/aboutme"><a>About me</a></Link></div>
                <Info>
                    <div>Made By Dongkeun</div>
                    <div>© 2022 Update from DK</div>
                </Info>      
            </Footer>
        </Content>
       
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;

const Content = styled.div`
    display:flex;
    justify-content:center;
    align-items: flex-end;
    flex-wrap: wrap;
    height:100vh;
    background-color: #E6E6FA;
`;

const Footer = styled.div`
    margin-bottom:50px;
    width:450px;
    padding: 0 60px;
    flex-wrap: wrap;
    display:flex;
    justify-content:center;
    justify-content:space-between;
`;

const Info = styled.div`
    margin-top:15px;
    width:100%;
    display:flex;
    justify-content:center;
    justify-content:space-around;
    color: #696969;
`;
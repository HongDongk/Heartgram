import styled from 'styled-components';
import Loginform from "../components/Loginform";
import Link from 'next/link';
import { createGlobalStyle } from 'styled-components';
import Image from "next/image";

import Heart from "../img/Heart.png";


const Global = createGlobalStyle`
    a {
        color: #696969;
        text-decoration: none;
        font-weight:bold;
    }
`;

const Home = () => {
    return (
        <Content>
            <Global/>
            <Main>
                <Image src={Heart} width={400} height={400}/>
                <Loginform/>
            </Main>
            
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

}

export default Home;

const Content = styled.div`
    display:flex;
    justify-content:center;
    align-items: flex-end;
    flex-wrap: wrap;
    height:100vh;
    background-color: #E6E6FA;
`;
const Main = styled.div`
    width:80%;
    padding:0 17%;
    display:flex;
    justify-content:center;
    justify-content:space-around;
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


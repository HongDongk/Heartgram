import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
    position: fixed;
    width:900px;
    height:660px;
    z-index: 5000;
    top: 80px;
    left:10px;
`;

export const Header = styled.header`
    height: 40px;
    background: whitesmoke;
    padding: 15px 0;
    text-align: center;
    
    & h1 {
        margin: 0;
        font-size: 20px;
        font-weight:bold;
        color: #333;
    }
`;

export const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    font-size: 30px;
    font-weight:bold;
    right: 30px;
    top: 20px;
    cursor: pointer;
`;

export const SlickWrapper = styled.div`
    background-color: whitesmoke;
    height: calc(100% - 70px); 
`;

export const ImgWrapper = styled.div`
    padding: 3% 0;
    text-align: center;
    
    & img {
        margin: 0 auto;
        max-height: 800px;
    }
`;


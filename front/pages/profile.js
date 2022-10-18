import UserProfile from "../components/UserProfile";
import { useCallback, useEffect } from 'react';
import TopMenu from "../components/TopMenu"
import styled, { createGlobalStyle }  from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';


const Profile = () => {

    return(
        <Content>
            <TopMenu/>
            <UserProfile/>
            <Border/>
        </Content>
    )

}

export default Profile;


const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
`;

const Border = styled.div`
    width:100vw;
    height:1px;
    border: 1px solid whitesmoke;
`;
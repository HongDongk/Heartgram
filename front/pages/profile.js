import UserProfile from "../components/UserProfile";
import { useCallback, useEffect } from 'react';
import TopMenu from "../components/TopMenu"
import styled, { createGlobalStyle }  from 'styled-components';
import { LOAD_USER_REQUEST } from '../reducers/user';
import { useDispatch } from 'react-redux';


const Profile = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
        });
    }, []);

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
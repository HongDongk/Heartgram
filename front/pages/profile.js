import UserProfile from "../components/UserProfile";
import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TopMenu from "../components/TopMenu";
import styled, { createGlobalStyle }  from 'styled-components';

import { LOAD_USER_REQUEST } from '../reducers/user';



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
        </Content>
    );

};

export default Profile;


const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
    overflow-x: hidden;
`;


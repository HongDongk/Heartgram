import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  
    const { me } = useSelector((state) => state.user);

    return (
        <Profile>
            <Avatar>{me.nickname}</Avatar>
            <Top>
                <Button>Edit Profile</Button>
            </Top>
            <Bottom>{me.nickname} {me.email}</Bottom>
            <Middle>
                <div>{me.Followings.length} Posts</div>
                <div>{me.Followings.length}팔로잉</div>
                <div>{me.Followers.length}팔로워</div>
            </Middle> 
        </Profile>
    );
};

export default UserProfile;

const Profile = styled.div`
    padding-top:50px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:700px;
    height:400px;
    background-color:white;
`;

const Top= styled.div`
    display:flex;
    justify-content:center;

    width:100%;
    background-color:white;
`;

const Middle = styled.div`
    display:flex;
    justify-content:center;
    width:500px;
    background-color:white;
`;

const Bottom = styled.div`
    display:flex;
    justify-content:center;
    width:700px;
    background-color:white;
`;

const Avatar = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100px;
    height:100px;
    border-radius:50%;
    background-color:gray;
    font-weight:bold;
    font-size:20px;
`;



import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';

import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  
    const { me } = useSelector((state) => state.user);

    return (
        <Profile>
            <Avatar>{me.nickname[0]}{me.nickname[1]}</Avatar>
            <Top>
                <Button>Edit Profile</Button>
            </Top>
            <Email>{me.email}</Email>
            <Middle>
                <div><Count>{me.Followings.length}</Count> Posts</div>
                <div><Count>{me.Followings.length}</Count> following</div>
                <div><Count>{me.Followers.length}</Count> followers</div>
            </Middle> 
           
            
        </Profile>
    );
};

export default UserProfile;

const Profile = styled.div`
    margin-top:50px;
    padding-top:50px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:650px;
    height:350px;
    background-color:whitesmoke;
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
    &:hover{  
        cursor: pointer;
    }
`;
const Top= styled.div`
    display:flex;
    justify-content:center;
    width:100%;
`;
const Email =styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    font-weight:bold;
`;
const Middle = styled.div`
    margin-left:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    justify-content:space-around;
    width:50%;
`;
const Count = styled.span`
    font-weight:bold;
`;

const Bottom = styled.div`
    display:flex;
    justify-content:center;
    width:700px;
    background-color:white;
`;





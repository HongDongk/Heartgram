import React, { useCallback , useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';

import modal from '../hooks/modal';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  
    const [open, showModal, handleOk, handleCancel] = modal(false);
    const [open2, showModal2, handleOk2, handleCancel2] = modal(false);
    const [open3, showModal3, handleOk3, handleCancel3] = modal(false);

    
    const { me } = useSelector((state) => state.user);

    return (
        <Profile>
            <Avatar>{me.nickname[0]}{me.nickname[1]}</Avatar>
            <Top>
                <Button>Edit Profile</Button>
            </Top>
            <Email>{me.email}</Email>
            <Info>
                <Sbutton onClick={showModal}><Count>{me.Followings.length}</Count> Posts</Sbutton>
                <Modal open={open} title="Posts" onOk={handleOk} onCancel={handleCancel} footer={[]}>
                    <p>{me.Followings.map(a => a.nickname)}</p>
                </Modal>
                <Sbutton onClick={showModal2}><Count>{me.Followings.length}</Count> Following</Sbutton>
                <Modal open={open2} title="Following" onOk={handleOk2} onCancel={handleCancel2} footer={[]}>
                    <p>{me.Followings.map(a => a.nickname)}</p>
                </Modal>       
                <Sbutton onClick={showModal3}><Count>{me.Followers.length}</Count> Followers</Sbutton>
                <Modal open={open3} title="Followers" onOk={handleOk3} onCancel={handleCancel3} footer={[]}>
                    <p>{me.Followers.map(a => a.nickname)}</p>
                </Modal>        
            </Info>      
        </Profile>
    );
};

export default UserProfile;

const Profile = styled.div`
    margin-top:30px;
    padding-top:50px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:520px;
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
const Info = styled.div`
    margin-left:30px;
    display:flex;
    justify-content:center;
    align-items:center;
    justify-content:space-around;
    width:50%;
`;
const Sbutton = styled.div`
    border: 0;
    outline: 0;
    &:hover{  
        cursor: pointer;
    }
`
const Count = styled.span`
    font-weight:bold;
`;

const Bottom = styled.div`
    display:flex;
    justify-content:center;
    width:700px;
    background-color:white;
`;





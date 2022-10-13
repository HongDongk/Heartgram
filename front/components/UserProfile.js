import React, { useCallback , useState } from 'react';
import { Button, Modal, Popover, EllipsisOutlined } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';

import modal from '../hooks/modal';
import UserEditForm from './UserEditForm';
import { UNFOLLOW_REQUEST } from '../reducers/user';
import UnFollow from './UnFollow';


const UserProfile = () => {
    
    const [open, showModal, handleOk, handleCancel] = modal(false);
    const [open2, showModal2, handleOk2, handleCancel2] = modal(false);
    const [open3, showModal3, handleOk3, handleCancel3] = modal(false);

    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);


    return (
        <Profile>
            <Avatar>{me.nickname[0]}{me.nickname[1]}</Avatar>
            <Email>{me.email}</Email>
            <Top>
                <Button onClick={showModal}>Edit Profile</Button>
                <SModal 
                    open={open} 
                    title="프로필 수정하기" 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    footer={[]}
                >
                    <UserEditForm/>
                </SModal>        
            </Top>
            
            <Info>
                <Sbutton><Count>{me.Followings.length}</Count> 게시글</Sbutton>
                <Sbutton onClick={showModal2}><Count>{me.Followers.length}</Count> 팔로워</Sbutton>
                <Modal open={open2} width={330} title="팔로워" onOk={handleOk2} onCancel={handleCancel2} footer={[]}>
                    <div>{me.Followers.map((a) => (<Items key={a.id}>{a.id} <UnFollow header="팔로워" unfollow={a}/></Items>))}</div>
                </Modal> 
                <Sbutton onClick={showModal3}><Count>{me.Followings.length}</Count> 팔로잉</Sbutton>
                <Modal open={open3} width={330} title="팔로잉" onOk={handleOk3} onCancel={handleCancel3} footer={[]}>
                    <div>{me.Followings.map((a) => (<Items key={a.id}>{a.id} <UnFollow header="팔로잉" unfollow={a}/></Items>))}</div>
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
    &:hover{  
        cursor: pointer;
    }
`;

const SModal = styled(Modal)`
    display:flex;
    justify-content:center;
`;

const Items = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:10px;
`;

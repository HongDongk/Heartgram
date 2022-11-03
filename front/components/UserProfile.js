import React, { useCallback , useEffect} from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import { EditFilled } from '@ant-design/icons';

import modal from '../hooks/modal';
import UnFollow from './UnFollow';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const UserProfile = () => {

    const dispatch = useDispatch();
    const [nickname, onChangeNickname, setNickname] = useInput('');
    const { me, changeNicknameDone } = useSelector((state) => state.user);

    useEffect(() => {
        if (changeNicknameDone) {
            setNickname('');
        }
    }, [changeNicknameDone]);

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
        handleCancel();
    }, [nickname]);
    
    const [open, showModal, handleOk, handleCancel] = modal(false);
    const [open2, showModal2, handleOk2, handleCancel2] = modal(false);
    const [open3, showModal3, handleOk3, handleCancel3] = modal(false);

    return (
        <div>{me && <Profile>
            <Avatar>{me.nickname[0]}</Avatar>
            <Email>{me.email}</Email>
            <Nickname>{me.nickname}<Sbutton2 onClick={showModal}><EditFilled /></Sbutton2></Nickname> 
            <SModal 
                open={open} 
                title="닉네임 수정하기" 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={[]}
                width={500}
                >             
                    <FormWrapper autoComplete="off">
                        <SInput 
                            name="user-nickname" 
                            placeholder={me.nickname}
                            type="string" 
                            value={nickname} 
                            onChange={onChangeNickname} 
                        />                      
                        {(nickname.length ==0) ? 
                            <Submit disabled key="submit" type="primary" onClick={onSubmit} htmlType="submit">수정하기</Submit> :
                            <Submit key="submit" type="primary" onClick={onSubmit} htmlType="submit">수정하기</Submit>
                        }
                    </FormWrapper>
            </SModal>        
            <Info>
                <Link href={`/user/${me.id}`}><SLink><Count>{me.Posts.length}</Count> 게시글</SLink></Link>
                <Sbutton onClick={showModal2}><Count>{me.Followers.length}</Count> 팔로워</Sbutton>
                <Modal open={open2} width={330} title="팔로워" onOk={handleOk2} onCancel={handleCancel2} footer={[]}>
                    <div>{me.Followers.map((a) => (<Items key={a.id}>{a.email} <UnFollow header="팔로워" unfollow={a}/></Items>))}</div>
                </Modal> 
                <Sbutton onClick={showModal3}><Count>{me.Followings.length}</Count> 팔로잉</Sbutton>
                <Modal open={open3} width={330} title="팔로잉" onOk={handleOk3} onCancel={handleCancel3} footer={[]}>
                    <div>{me.Followings.map((a) => (<Items key={a.id}>{a.email} <UnFollow header="팔로잉" unfollow={a}/></Items>))}</div>
                </Modal>            
            </Info>      
        </Profile>}</div>
    );
};

export default UserProfile;

const Profile = styled.div`
    padding-top:50px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    width:520px;
    height:350px;
    background-color:whitesmoke;
    border-radius:20px;
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
const Nickname= styled.div`
    display:flex;
    height:25px;
    font-size:15px;
    font-weight:bold;
    justify-content:center;
    align-items:center;
    width:100%;
`;
const Submit = styled(Button)`
    margin-top:15px;
    margin-left:160px;
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
`;
const Sbutton2 = styled.div`
    margin-left:10px;
    font-size:18px;
    color:grey;
    &:hover{  
        cursor: pointer;
    }
`;
const SLink = styled.a`
    text-decoration: none;
    font-size:14px;
`;
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
const SInput=styled(Input)`
    width:250px;
    border-radius:6px;  
`;
const FormWrapper=styled(Form)`
    width:250px;
`;

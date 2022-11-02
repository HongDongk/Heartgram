import React, { useCallback , useEffect} from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';

import modal from '../hooks/modal';
import UnFollow from './UnFollow';
import useInput from '../hooks/useInput';
import { CHANGE_EMAIL_REQUEST, CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const UserProfile = () => {

    const dispatch = useDispatch();
    const [email, onChangeEmail, setEmail] = useInput('');
    const [nickname, onChangeNickname, setNickname] = useInput('');
    const { changeEmailDone, changeNicknameDone, me } = useSelector((state) => state.user);

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_EMAIL_REQUEST,
            data: email,
        });
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
        handleCancel();
    }, [email, nickname]);
    
    useEffect(() => {
        if (changeEmailDone) {
            setEmail('');
        }
        if (changeNicknameDone) {
            setNickname('');
        }

    }, [changeEmailDone, changeNicknameDone]);

    const [open, showModal, handleOk, handleCancel] = modal(false);
    const [open2, showModal2, handleOk2, handleCancel2] = modal(false);
    const [open3, showModal3, handleOk3, handleCancel3] = modal(false);

    return (
        <div>{me && <Profile>
            <Avatar>{me.nickname[0]}</Avatar>
            <Email>{me.email}</Email>
            <Top>
                <Button onClick={showModal}>Edit Profile</Button>
                <SModal 
                    open={open} 
                    title="프로필 수정하기" 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    footer={[<Button key="back" onClick={handleCancel}>
                                뒤로가기
                             </Button>,
                             <Button key="submit" type="primary" onClick={onSubmit} htmlType="submit">
                                수정하기
                             </Button>
                           ]}
                >
                    <FormWrapper layout="vertical" autoComplete="off">
                        <Form.Item label="이메일 수정" name="changeemail">
                            <SInput 
                                name="user-email" 
                                defaultValue={me.email} 
                                type="email" 
                                value={email} 
                                onChange={onChangeEmail} 
                            />
                        </Form.Item>
                        <Form.Item label="닉네임 수정" name="changenickname">
                            <SInput 
                                name="user-nickname" 
                                defaultValue={me.nickname}
                                type="string" 
                                value={nickname} 
                                onChange={onChangeNickname} 
                            />
                        </Form.Item>
                    </FormWrapper>
                </SModal>        
            </Top>
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
    width:350px;
    border-radius:6px;  
`;
const FormWrapper=styled(Form)`
    width:350px;
`;

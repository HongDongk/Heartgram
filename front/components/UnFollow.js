import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { UNFOLLOW_REQUEST , UNFOLLOWING_REQUEST } from '../reducers/user';

const UnFollow = ({ unfollow , header }) => {
    
    const dispatch = useDispatch();
    const { unfollowLoading, unfollowingLoading } = useSelector((state) => state.user);
    
    const onClickButton = useCallback(() => {
        if(header === '팔로워') {
            dispatch({
                type: UNFOLLOWING_REQUEST,
                data: unfollow.id,
            });
        } else {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: unfollow.id,
            });
        }
    }, []);

    return (
        <UnfollowButton type="primary" loading={unfollowLoading || unfollowingLoading} onClick={onClickButton}>
            {(header === '팔로워') ? '삭제' : '언팔로우'}
        </UnfollowButton>
    );
};

UnFollow.propTypes = {
    unfollow: PropTypes.object.isRequired,
};

const UnfollowButton = styled(Button)`
    border-radius:10px; 
`;

export default UnFollow;
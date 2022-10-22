import UserProfile from "../components/UserProfile";
import TopMenu from "../components/TopMenu";
import styled from 'styled-components';
import { END } from 'redux-saga';
import axios from 'axios';

import { LOAD_USER_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';



const Profile = () => {

    return(
        <Content>
            <TopMenu/>
            <UserProfile/>
        </Content>
    );

};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
      type: LOAD_USER_REQUEST,
    });
    store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default Profile;



const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
    overflow-x: hidden;
`;


import UserProfile from "../components/UserProfile";
import TopMenu from "../components/TopMenu"
import styled, { createGlobalStyle }  from 'styled-components';
import PostForm from "../components/Postform";


const Profile = () => {
    return(
        <Content>
            <TopMenu/>
            <UserProfile/>
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
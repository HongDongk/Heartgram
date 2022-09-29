import TopMenu from "../components/TopMenu"
import styled, { createGlobalStyle }  from 'styled-components';
import PostForm from "../components/Postform";

const Main = () => {
    return(
        <Content>
             <TopMenu/>
             <PostForm/>
        </Content>
       
    )

}

export default Main;

const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    background-color: #E6E6FA;
`;



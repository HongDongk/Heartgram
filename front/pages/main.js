import TopMenu from "../components/TopMenu"
import styled, { createGlobalStyle }  from 'styled-components';

const Main = () => {
    return(
        <Content>
             <TopMenu/>
        </Content>
       
    )

}

export default Main;

const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap: wrap;
    height:100vh;
    background-color: whitesmoke;
`;



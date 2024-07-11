import styled from "styled-components";
import Leftside from "../components/Leftside";
import Rightside from "../components/Rightside";
import Main from "../components/Main";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  const navigate = useNavigate();
  return ( <>
    {!props.User&& navigate("/")} 
    <Container>
      {/* <Section>
         <h5><a>Hiring in a hurry? - </a></h5>
         <p> Find talented pros in record time with Upwork and keep business
         moving.</p>
      </Section> */}

      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>

    </Container>
  </>
  )
};

const Container = styled.div`
  padding-top: 52px;
  max-width: 84%;
  margin: 0 auto;

  @media (max-width: 768px) { 
    max-width: 100%;
  }
`;

const Content = styled.div`
  max-width: 1128px;
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  /* text-decoration: underline; */
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    text-decoration: underline;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }

p {
  font-size: 14px;
  color: #434649;
  text-decoration: underline;
  font-weight: 600;
}

@media (max-width: 768px) {
  flex-direction: column;
  padding: 0 5px;
}
`;

const Layout = styled.div`
display: grid;
grid-template-areas: "leftside main rightside";
grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
column-gap: 25px;
row-gap: 25px;
/* grid-template-row: auto; */
margin: 25px 0;

@media (max-width: 768px) {
  display: flex;
  flex-direction: column;
  padding: 0 5px;
}

@media(min-width: 768px) and (max-width:860px){
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(0, 0fr);
}

`;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem('User')),
    // user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  
});


export default connect(mapStateTOProps, mapDispatchToProps)(Home);
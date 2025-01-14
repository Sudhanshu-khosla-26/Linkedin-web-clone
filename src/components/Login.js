import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions/index";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  return (

    <Container>
        {props.user && navigate("/feed") }
        <Nav>
            <a href="/">
                <img src="/images/login-logo.svg" alt="" />
            </a>
            <div>
                <Join>Join now</Join>
                <SignIn>Sign in</SignIn>
            </div>
        </Nav>
        <Section>
            <Hero>
                <h1>Welcome to your professional community</h1>
                <img src="/images/login-hero.svg" alt="" />
            </Hero>
            <Form>
                <Google onClick={()=> props.signIn()}>
                    <img src="/images/google.svg" alt="" />
                    Sign in with Google
                </Google>
            </Form>
        </Section>
    </Container>
  )
}

const Container = styled.div`
    padding:0px;  
    
`;

const Nav = styled.nav`
    max-width: 1128px;
    margin: auto;
    padding: 12px 0 16px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    flex-wrap: nowrap;

    &  > a{ 
        width: 135px;
        height: 34px;
        @media(max-width: 768px){
            padding: 0 5px;
        }
    }
`;

const Join = styled.a`
    font-size: 16px;
    padding: 10px 12px;
    text-decoration: none;
    color: rgba(0,0,0 ,0.6);
    border-radius: 4px;
    margin-right: 12px;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.08);
        color: rgba(0,0,0 ,0.9);
        text-decoration: none;
    }
    @media(max-width: 360px){
        padding: 12px 12px;
        font-size: 10px;
    }

`;  

const SignIn = styled.a`
    box-shadow: inset 0 0 0 1px #0a66c2;
    color: #0a66c2;
    border-radius: 24px;
    transition-duration: 167ms;
    font-size: 16px;
    font-weight: 600;
    line-height: 14px;
    padding: 10px 24px;
    text-align: center;
    cursor: pointer;
    background-color: rgba(0,0,0,0);
    &:hover{
        background-color: rgba(112,181,249,0.15);
        color: #0a66c2;
        text-decoration: none;
    }
    @media(max-width: 360px){
        padding: 12px 12px;
        font-size: 10px;
    }
`;

const Section = styled.section`
    display: flex;
    align-content: start;
    min-height: 700px;
    padding-bottom: 138px;
    padding-top: 40px;
    padding: 60px 0;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1128px;
    align-items: center;
    margin: auto;
    @media (max-width: 768px){
        margin: auto;
        min-height: 0px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
`;

const Hero = styled.div`
    width: 100%;
    h1{
        padding-bottom: 0;
        width: 55%;
        font-size: 56px;
        font-weight: 200;
        color: #2977c9;
        line-height: 70px;
        @media (max-width:768px){
            text-align: center;
            font-size: 20px;
            width: 100%;
            line-height: 2px;
        }
    }

    img{
        /* z-index: -1; */
        width: 700px;
        height: 670px;
        position: absolute;
        bottom: -2px;
        right: -150px;
        @media (max-width:768px){
            top: 230px;
            width: initial;
            position: initial;
            margin-top: 25px;
            height: initial;
        }
    }

    @media(max-width: 414px){
        h1{
            font-size: 16px;
        }
    }
`;

const Form = styled.div`
    margin-top: 100px;
    width: 408px;
    @media (max-width:768px){
          margin-top: 20px;
    }
`;

const Google = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    height: 56px;
    width: 100%;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%), inset 0 0 0 1px rgb(0 0 0 / 0%);
    color: rgba(0,0,0,0.6);
    vertical-align: middle;
    z-index: 0;
    transition-duration: 167ms ;
    font-size: 20px;

    &:hover{
        background-color: rgba(207,207,207,0.2);
        color: rgba(0,0,0,0.75);
    }
`;

const mapStateTOProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateTOProps, mapDispatchToProps)(Login);
// export default Login;

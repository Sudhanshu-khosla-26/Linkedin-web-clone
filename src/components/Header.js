import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../actions";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  getUserconnectInviteSendedAPI,
  getUserconnectInvitesAPI,
} from "../actions";
import { useEffect } from "react";

const Header = (props) => {
  const [active, setactive] = useState(false)

  useEffect(() => {
    const payload = {
      user: props.User,
    };
    props.getUserconnectinvites(payload);
    props.getUserconnectInviteSended(payload);
  }, []);

  return (
    <div>
      <Container>
        <Content>
          <Logo>
            <a href="/feed">
              <img src="/images/home-logo.svg" alt="" />
            </a>
          </Logo>
          <Search>
            <div>
              <input type="text" placeholder="Search" />
            </div>
            <SearchIcon>
              <img src="/images/search-icon.svg" alt="" />
            </SearchIcon>
          </Search>
          <Nav>
            <NavListWrap>
              <NavList  className="active">
                <Link to="/feed">
                  <img src="/images/nav-home.svg" alt="" />
                  <span>Home</span>
                </Link>
              </NavList>

              <NavList>
              <Link to="/mynetwork/grow/">
                <img src="/images/nav-network.svg" alt="" />
                <span>My Network</span>
                {props.UserConnectionsInviteList.length > 0 &&
                <img src="/images/dot.png" alt="" className="notice" />}
                </Link>
            </NavList>

            <NavList>
              {/* <Link to="/jobs"> */}
              <Link >
                <img src="/images/nav-jobs.svg" alt="" />
                <span>Jobs</span>
              </Link>
            </NavList>

            <NavList className="Message">
              <Link to={`/messaging/thread/:ChatId`}>
                <img src="/images/nav-messaging.svg" alt="" />
                <span>Messaging</span>
              </Link>
            </NavList>

            <NavList>
              {/* <Link to="notifications/?filter=all"> */}
              <Link >
                <img src="/images/nav-notifications.svg" alt="" />
                <span>Notifications</span>
              </Link>
            </NavList>

            <User>
              <a>
                {props.User && props.User.photoURL ?
                 ( <img src={props.User.photoURL} alt="" />)
                  :
                  (<img src="/images/user.svg" alt="" />)}
                <div className="user dropdown">
                <span>
                  Me
                  <img src="/images/down-icon.svg" alt="" />
                </span>
                </div>
              </a>

              <SignOut onClick={()=>{props.signOut();}}>
                <a>Sign Out</a>
              </SignOut>
            </User>

            <Work>
              <a>
                <img src="/images/nav-work.svg" alt="" />
                <span>
                For Business
                  <img src="/images/down-icon.svg" alt="" />
                </span>
              </a>
            </Work>
            <Premium>
              <span>Unlock 1 month of </span>
              <span>Premium</span>
            </Premium>

            </NavListWrap>
          </Nav>
        </Content>
      </Container>
    </div>
  );
};

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  left: 0;
  right: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 100;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
      margin: 0 auto ;
      padding: 6px 24px ;
    }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 auto;
  min-height: 100%;
  max-width: 1128px;
`;

const Logo = styled.span`
  margin-right: 8px;
  font-size: 0px;
`;

const Search = styled.div`
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;
    input {
      border: none;
      box-shadow: none;
      background-color: #eef3f8;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      border-color: #dce6f1;
      vertical-align: text-top;
    }
  }

  @media (max-width: 768px) {
     input{
      display: none;
      width: 260px !important;
      /* display: none; */
     }
    }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 2px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    top: 0px;
    margin-left: 4px;
    position: relative;
    vertical-align: middle;
    margin-right: 18px;
    img{ 
      width: 24px; 
      height: 24px;
    }
    }
`;

const Nav = styled.nav`
  margin-left: auto;
  display: block;
  @media (max-width: 768px) {
    /* position: fixed; */
    /* left: 0; */
    /* bottom: 0; */
    /* background: white; */
    width: 100%;
  }
  `;

const NavListWrap = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  list-style-type: none;

  @media (max-width: 768px) {
    gap: 20px;
  }
  
  .active {
    span:after {
      content: "";
      transform: scaleX(1);
      border-bottom: 2px solid var(--white, #fff);
      bottom: 0;
      left: 0;
      position: absolute;
      transition: transform 0.2s ease-in-out;
      width: 100%;
      border-color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const NavList = styled.li`
  display: flex;
  align-items: center;
  a {
    align-items: center;
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;
    line-height: 1.5;
    min-height: 52px;
    min-width: 80px;
    position: relative;
    text-decoration: none;


    span {
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
    }

    .notice{
      position: absolute;
      top: 2px;
    right: 18px;
    width: 20px;
    }

    @media (max-width: 768px) {
      min-width: fit-content;
      img{
        width: 24px;
        height: 24px;
      }
      span{
        display: none;
      }
    }
  }

  &:hover,
  &:active {
    a {
      span {
        color: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const SignOut = styled.div`
  position: absolute;
  top: 45px;
  background: white;
  border-radius: 0 0 5px 5px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition-duration: 167ms;
  text-align: center;
  display: none;
  cursor: pointer;

  &:hover{
    background-color: rgba(0,0,0,0.10)
  }

  @media(max-width: 768px){
    right: 56px;
    top: 55px;
  }
`;

const User = styled(NavList)`
  a > svg {
    width: 24px;
    border-radius: 50%;
  }
  
  a > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  span {
    display: flex;
    align-items: center;
    margin-left: 6px;
  }

  &:hover {
    ${SignOut} {
      align-items: center;
      display: flex;
      justify-content: center;
    }
  }
`;

const Work = styled(User)`
  border-left: 1px solid rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
        display: none;
  }
`;

const Premium = styled.div`
  color: #5C3B09;
  height: 44px;
  width: 125px;
  margin-left: 6px;
  padding-top: 4px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-decoration: underline;
  &:hover{
    color: brown;
  }
  span{
    align-items: center;
  }

  @media (max-width: 768px) {
    display: none;
  }

  `;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem('User')),
    // user: state.userState.user,
    UserConnectionsInviteList: state.articleState.UserConnectionsInviteList,
    UserConnectionsInviteSendedList:
      state.articleState.UserConnectionsInviteSendedList,
  };
  };

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
  getUserconnectinvites: (payload) =>
    dispatch(getUserconnectInvitesAPI(payload)),
  getUserconnectInviteSended: (payload) =>
    dispatch(getUserconnectInviteSendedAPI(payload)),
});


export default connect(mapStateTOProps, mapDispatchToProps)(Header);

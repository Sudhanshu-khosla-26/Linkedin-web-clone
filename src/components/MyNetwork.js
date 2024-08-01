import styled from "styled-components";
import Footer from "./Footer";
import Grow from "./Grow";
import { useState } from "react";
import { connect } from "react-redux";
import { getUserconnectionlistAPI } from "../actions";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FloatingChatbar from "./FloatingChatbar";

const MyNetwork = (props) => {
  const navigate = useNavigate();
  const [DropdownInfo, setDropdownInfo] = useState(false);

  const payload = {
    user: props.User,
}

useEffect(()=> {
    props.getUserconnectionlist(payload)
},[props.user])

  return (
    <>
      <Container>
      {!props.User && navigate("/")} 
        <div className="dropdown">
          <ArtCard>
            <Networkfooter>
              <div className="mynetwork" onClick={() => {DropdownInfo? setDropdownInfo(false) : setDropdownInfo(true)}} >
                <span>
                <h2>Manage my network</h2>
                </span>
                <span>
                  {!DropdownInfo ? (
                    <img src="/images/arrow-down.png" alt="" />
                  ) : (
                    <img src="/images/arrow-up.png" alt="" />
                  )}
                </span>
              </div>
            {DropdownInfo &&
            <>
              <div className="connections">
              <Link style={{width: '100%',display: "flex", textDecoration: "none", justifyContent: "space-between"}} to={"/mynetwork/invite-connect/connections/"}>
                <span >
                  <img src="/images/connections-icon.png" alt="" />
                  Connections
                </span>
                <span>{props.Userconnectionslist.length}</span>
              </Link>
              </div>
              <div className="following_followers">
                <span>
                  <img src="/images/following-icon.png" alt="" />
                  Following & Followers
                </span>
              </div>
              <div className="Groups">
                <span>
                  <img src="/images/groups-connect-icon.png" alt="" />
                  Groups
                </span>
                <span>12</span>
              </div>
              <div className="Events">
                <span>
                  <img src="/images/share-event.png" alt="" />
                  Events
                </span>
                <span>1</span>
              </div>
              <div className="pages">
                <span>
                  <img src="/images/Page-icon.png" alt="" />
                  Pages
                </span>
                <span>35</span>
              </div>
              <div className="Newsletters">
                <span>
                  <img src="/images/newsletter-icon.png" alt="" />
                  Newsletters
                </span>
                <span>4</span>
              </div>
              <div className="hashtags">
                <span>
                  <img src="/images/hashtag-icon.png" alt="" />
                  Hashtags
                </span>
              </div>
            </>}
            </Networkfooter>
          </ArtCard>
          <Footer className="footer" />
        </div>

      <div className="Grow_CatchBtns">
        <HeaderBtns>
              <button>
                <span>
                  Grow
                </span>
              </button>
              <button className="catchbtn">
                <span>
                  Catch up
                </span>
              </button>
        </HeaderBtns>      

        <Grow />
      </div>

      <div className="homechat">
        <FloatingChatbar />
      </div>
      <div className="homechatbox">
        {/* <FloatingChatbox /> */}
      </div>
      </Container>
    </>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 80px auto 0 auto;
  width: 84%;
  justify-content: space-between;
  gap: 30px;

  .homechat{
    position: fixed;
    bottom: 0;
    right: 22px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .homechatbox{
    position: fixed;
    bottom: 0;
    right: 326px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .dropdown{
    display: block;
    position: sticky;
    top: 82px;
    height: fit-content;
  }

  @media (max-width: 768px) {
    margin: 80px auto  80px auto;
    flex-direction: column;
    width: 374px;
    .dropdown{
      position: static;
    }
  }
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 8px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgba(0 0 0 /20%);
  
  @media (max-width: 768px) {
    width: 370px !important;
  }
`;

const Networkfooter = styled.div`
  width: 300px;
  max-height: 405px;
  /* position: fixed; */
  background-color: #fff;
  /* z-index:20; */
  /* top: 80px; */

  @media (max-width: 768px) {
    /* width: 420px !important; */
    & > div{
      width: 332px !important;
    }
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
    width: 252px;
    padding: 12px 24px;


    &:hover{
      background-color: #F3F3F3;
    }
    span {
      font-size: 16px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-right: 8px;
        width: 24px;
        height: 24px;
      }
    }

    
  }

  .hashtags{
    padding: 12px 24px 12px 24px;
    margin-bottom: 16px;
  }

  .mynetwork {
    width: 268px;
    height: 52px;
    padding: 0 8px 0 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    &:hover{
      background-color: #fff;
    }
    span {
      font-size: 16px;
      margin-right: 8px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 24px;
      img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16px;
        height: 16px;
      }
    }

    @media (max-width: 768px) {
      width: 350px !important;
    }
  }
`;

const HeaderBtns = styled(ArtCard)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  width: 780px;
  height: 52px;
  padding-left: 24px;
  gap: 20px;
  margin-bottom: 16px;
  button{
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    outline: none;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    color: #09964f;
    border-bottom: 4px solid #09964f;

    span{
      line-height: 20px;
      font-size: 16px;
      font-weight: 600;
      width: 38.5px;
      height: 20px;
    }
    &:hover{
      background-color: #F3F3F3;
    }
  }

  .catchbtn{
    border: none;
    span{
      color: rgba(0,0,0,0.7);
      display: flex;
      width: 65px;
    }
  }

  @media (max-width: 768px) {
    width: 348px !important;
  }
`;



const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem("User")),
    Userconnectionslist: state.articleState.Userconnectionslist,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserconnectionlist: (payload) => dispatch(getUserconnectionlistAPI(payload)),
});

export default connect(mapStateTOProps, mapDispatchToProps)(MyNetwork);
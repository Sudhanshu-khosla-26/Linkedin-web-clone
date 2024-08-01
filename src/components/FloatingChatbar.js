import styled from "styled-components";
import { connect } from "react-redux";
import FloatingSideChat from "./FloatingSideChat";
import { getUserconnectionlistAPI } from "../actions";
import { useEffect, useState } from "react";
import FloatingChatbox from "./FloatingChatbox";

const FloatingChatbar = (props) => {
  const [showfloatsidebox, setShowfloatsidebox] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);


    useEffect(() => {
      // alert('render Floating chstbar' +  props.User);
        const payload = {
          user: props.User,
        };
        props.getUserconnectionlist(payload);
        console.log(props.Userconnectionslist);
      }, []);


      
  return (
    <Container>
      <Box>
        <div className="header" onClick={() => {showfloatsidebox? setShowfloatsidebox(false) : setShowfloatsidebox(true)}}>
          <div className="messenger">
            <div className="messengerimg">
              <img className="userimg" src={props.User.photoURL} alt="" />
              <img className="active" src="/images/active.png" alt="" />
            </div>
            <span>Messaging</span>
          </div>
          <button className="more">
            <img src="/images/more.png" alt="" />
          </button>
          <button className="notepad">
            <img src="/images/notepad-icon.png" alt="" />
          </button>
          <button className="dropdown" >
            {showfloatsidebox ? 
            <img src="/images/arrow-down.png" alt="" />
            :
            <img src="/images/arrow-up.png" alt="" />
          }
          </button>
        </div>  
        {showfloatsidebox && <div className="searchbox">
                  <img className="searchimg" src="/images/search-icon.png" alt="" />
                  <input placeholder="Search messages" />
                  <img className="adjust" src="/images/search-adjust.png" alt="" />
                  
        </div> }
        {showfloatsidebox && <div className="buttons">
            <button className="Focused">
                <span>
                    Focused
                </span>
            </button>
            <button className="others">
                <span>Other</span>
            </button>
        </div> }
        {showfloatsidebox && <div className="sidechatbar">
              {/* {props.Userconnectionslist.length === 0 ? (
                <div style={{ margin: "4px auto", fontSize: "20px" }}>
                  Please Connect With User To Chat
                </div>
              ) : null} */}
              {props.Userconnectionslist.length > 0 &&
                props.Userconnectionslist.map((Data, Key) => (
                  // console.log(Data.ConnectData.userInfo.displayName)
                  <FloatingSideChat
                    name={Data?.ConnectData?.userInfo?.displayName}
                    userPhoto={Data?.ConnectData?.userInfo?.photoURL}
                    key={Data?.ConnectData?.connectid}
                    id={Data?.ConnectData?.connectid}
                    setChatid={(id) => {setSelectedChatId(id)}}
                    
                  />
                ))}
            </div>}
            { selectedChatId && <FloatingChatbox showfloatsidebox={showfloatsidebox} blank={(value) => {setSelectedChatId(value)}} key={selectedChatId}  chatId={selectedChatId} />}
            
      </Box>
    </Container>
  );
};

const Container = styled.div``;

const Box = styled.div`
  max-height: 547px;
  height: unset;
  width: 288px;
  background-color: #ffffff;
  border-radius: 9px;
  border: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    &:hover{
        background-color: #ebf4fd;
    }

    & > button {
        border: none;
        outline: none;
        background-color: transparent;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center; 
        &:hover{
            background-color: rgba(0, 0, 0, 0.1);
        }
        img{
            width: 16px;
            height: 16px;
        }
    }

    .messenger {
      display: flex;
      align-items: center;
      width: 168px;
      height: 39px;
      padding: 4px;
      margin: 0 4px;

      span{
        margin-left: 8px;
        font-weight: 600;
        line-height: 20px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
      }

      .messengerimg {
        width: 32px;
        height: 32px;
        border-radius: 50%;

        .userimg {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          position: relative;
        }
        .active {
          position: absolute;
          height: 12px;
          border: 1px solid white;
          width: 12px;
          border-radius: 50%;
          top: 30px;
          left: 29px;
        }
      }
    }
  }

  .searchbox {
        /* width: 200px; */
        /* background-color: #f8fafd; */
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 8px 16px;
        /* height: 32px; */
   
        @media (max-width: 768px) {
          margin-top: 6px;
            width: 256px;
            height: 28px;
            }
        .searchimg {
          position: absolute;
          width: 16px;
          height: 16px;
          padding: 0 3px;
          left: 24px;
          @media (max-width: 768px) {
            padding: 0 6px;
            left: 23px;
            }
        }
        .adjust{
          position: absolute;
          width: 16px;
          height: 16px;
          padding: 0 3px;
          right: 21px !important;
        }
        input {
          color: rgba(0, 0, 0, 0.9);
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          width: 204px;
          height: 30px;
          padding: 0 32px 2px 32px;
          /* outline: none; */
          border: none;
          background-color: #EDF3F8;
          @media (max-width: 768px) {
            width: 224px;
            height: 16px;
            padding: 6px 8px 6px 24px;
            }
        }
      }

  .buttons {
  display: flex;
  width: 288px;
  height: 52px;
  border-bottom: 1px solid #ebebeb;    
  & > button{
    padding: 9px 8px 11px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    outline: none;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    color: #09964f;
    border-bottom: 2px solid #09964f;

    span{
        display: flex;
        justify-content: center;
        align-items: center;
      line-height: 20px;
      font-size: 14px;
      font-weight: 600;
      width: 128px;
      height: 20px;
    }
    &:hover{
      background-color: #F3F3F3;
    }
  }

  .others{
    border: none;
    span{
      color: rgba(0,0,0,0.7);
      display: flex;
    }
    }
  }

  .sidechatbar{
    height: 401px;
      .sidechat {
        width: 288px !important;
        height: 66px !important;
        
        a{
          text-decoration: none;
        }
    }
      .sidechat .left_border{
        display: none !important;
    }
          .sidechat .userimage img {
    width: 48px;
    height: 48px;
    }
     .sidechat .userinfo {
        margin-top: 14px;
        width: 212.4px !important;
    }
     .sidechat .userinfo .username {
        width: 212.4px;
    }
     .sidechat .userinfo .username{

        span{
            font-weight: 400;
            line-height: 20px;
            font-size: 14px;  
          }
        :last-child{
            font-weight: 400;
            line-height: 20px;
            font-size: 12px;      
            color: rgba(0, 0, 0, 0.6);
        }
    }
     .sidechat .userinfo .lastmessage {
        font-weight: 400;
            line-height: 16px;
            font-size: 12px;  
    }
  }
  

`;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem("User")),
    user: state.userState.user,
    Userconnectionslist: state.articleState.Userconnectionslist,
  };
};

const mapDispatchToProps = (dispatch) => ({
    getUserconnectionlist: (payload) =>
        dispatch(getUserconnectionlistAPI(payload)),
});

export default connect(mapStateTOProps, mapDispatchToProps)(FloatingChatbar);

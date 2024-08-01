import styled from "styled-components";
import React from "react";
import SideChat from "./SideChat";
import ChatBox from "./ChatBox";
import Footer from "./Footer";
import { connect } from "react-redux";
import { getUserconnectionlistAPI } from "../actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatingChatbar from "./FloatingChatbar";

const MessagePage = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const payload = {
      user: props.User,
    };
    props.getUserconnectionlist(payload);
    console.log(props.Userconnectionslist);
  }, []);

  return (
    <>
      <Container>
        {!props.User && navigate("/")}
        <ArtCard>
          <div className="messageheader">
            <div className="msg_search">
              <span>Messaging</span>
              <div className="search">
                <div className="searchbox">
                  <img src="/images/search-icon.svg" alt="" />
                  <input placeholder="Search messages" />
                </div>
              </div>
            </div>
            <div className="options">
              <span>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nO3SMQrAIBBE0V95dE3umfUaCYJsEZZUcZNiHtjIH7AQREREfqYAO9ABA7Z5t7pzIzhvpyV0rgeDcbe6cxYMjoTOtWBQEzpX5sjmS+vD53qzExER4TMXBaxSQgA4HO4AAAAASUVORK5CYII="
                  alt=""
                />
              </span>
              <span>
                <img
                  style={{ width: "32px", height: "32px" }}
                  src="/images/notepad-icon.jpg"
                  alt=""
                />
              </span>
            </div>
          </div>

          <div className="functionbuttons">
            <button className="focused">
              <span>
                Focused
                <img src="/images/drop-down-arrow.png" alt="" />
              </span>
            </button>
            <div className="border"></div>
            <button>
              <span>Unread</span>
            </button>
            <button>
              <span>My Connections</span>
            </button>
            <button>
              <span>InMail</span>
            </button>
            <button>
              <span>Starred</span>
            </button>
          </div>

          <div className="chat">
            <div className="sidechatbar">
              {props.Userconnectionslist.length === 0 ? (
                <div style={{ margin: "4px auto", fontSize: "20px" }}>
                  Please Connect With User To Chat
                </div>
              ) : null}
              {props.Userconnectionslist.length > 0 &&
                props.Userconnectionslist.map((Data, Key) => (
                  // console.log(Data.ConnectData.userInfo.displayName)
                  <SideChat
                    name={Data.ConnectData.userInfo.displayName}
                    userPhoto={Data.ConnectData.userInfo.photoURL}
                    Key={Data.ConnectData.connectid}
                    id={Data.ConnectData.connectid}
                  />
                ))}
            </div>
            {props.Userconnectionslist.length > 0 ? <ChatBox /> : null}
          </div>
        </ArtCard>

        <div className="footer">
          <Footer />
        </div>

        <div className="homechat">
        <FloatingChatbar/>
      </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  position: fixed;
  margin: 73px 113.1px 0 113.1px;
  width: 83%;

  .footer {
    @media (max-width: 768px) {
      display: none;
    }
    .sc-gFqAYk {
      ul {
        width: 270px;
      }
    }
  }

  .homechat{
    position: fixed;
    bottom: 0;
    right: 22px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const ArtCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 8px;
  width: 782px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgba(0 0 0 /20%);
  display: flex;
  flex-direction: column;

  .messageheader {
    display: flex;
    flex-direction: row;
    height: 48px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    .msg_search {
      display: flex;
      flex-direction: row;
      span {
        padding: 0 4px 0 16px;
        font-weight: 600;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 24px;
        color: rgba(0, 0, 0, 0.9);
      }
      .search {
        display: flex;
        align-items: center;
        gap: 16px;
        /* outline: none; */
        /* border: none; */

        /* span {
        font-weight: 400;
        color: #0a66ce;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        &:hover {
          text-decoration: underline #0a66ce;
        } */
        /* } */
        .searchbox {
          margin: 8px 12px;
          /* width: 200px; */
          background-color: #edf3f8;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          outline: 2px solid transparent;
          /* border: 2px solid transparent; */
          border-radius: 6px;
          &:hover {
            outline: 2px solid rgba(0, 0, 0, 0.9);
          }

          img {
            position: absolute;
            width: 16px;
            height: 16px;
            padding: 0 3px;
            left: 116px;
          }
          input {
            /* margin-left: 4px; */
            color: rgba(0, 0, 0, 0.9);
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            width: 159px;
            outline: none;
            padding: 0 28px 1px 32px;
            border: none;
            background-color: #edf3f8;
          }
        }
      }
    }

    .options {
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 4px;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        img {
          width: 22px;
          height: 22px;
          cursor: pointer;
          mix-blend-mode: darken;
        }
      }
    }
  }

  .functionbuttons {
    display: flex;
    align-items: flex-start;
    padding: 0 0 8px 16px;
    margin: 8px 0 0 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    .border {
      padding: 12px 0;
      margin: 2px 10px 0 6px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    & > button {
      border-radius: 20px;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.5);
      margin-right: 8px;
      padding: 6px 12px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      span {
        height: 16px;
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.9);
      }
    }
    .focused {
      background-color: #01754f;
      &:hover {
        background-color: #004c33;
      }
      span {
        color: white;
        img {
          margin-left: 8px;
          filter: invert(1);
          width: 12px;
          height: 12px;
        }
      }
    }
  }

  .chat {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    /* justify-content: space-between; */
    height: unset;

    .sidechatbar {
      border-right: 1px solid #ebebeb;
      height: 465px;
      max-height: 465px;
      width: 320px;
      /* width : 330px ; */
      /* overflow-y: scroll; */
      overflow-x: hidden;
    }

    .sidechatbar::-webkit-scrollbar {
      scrollbar-width: none;
    }
  }
`;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem("User")),
    Userconnectionslist: state.articleState.Userconnectionslist,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserconnectionlist: (payload) =>
    dispatch(getUserconnectionlistAPI(payload)),

  // getAritcles: (payload) => dispatch(getAritcleAPI(payload)),
});

export default connect(mapStateTOProps, mapDispatchToProps)(MessagePage);

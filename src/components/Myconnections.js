import styled from "styled-components";
import Footer from "./Footer";
import { connect } from "react-redux";
import { getUserconnectionlistAPI } from "../actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Myconnections = (props) => {
  const payload = {
    user: props.User,
  };

  useEffect(() => {
    props.getUserconnectionlist(payload);
  }, [props.user]);

  return (
    <>
      <Container>
        <ArtCard>
          <ConnectionHeader>
            <div className="connection_count">
              <span>{props.Userconnectionslist.length} Connections</span>
            </div>
            <div className="filter_section">
              <div className="sortby">
                <span>
                  Sort by:
                  <span>
                    Recenttly added
                    <img src="/images/drop-down-arrow.png" alt="" />
                  </span>
                </span>
              </div>
              <div className="search">
                <div className="searchbox">
                  <img src="/images/search-icon.png" alt="" />
                  <input placeholder="Search by name" />
                </div>
                <span>Search with filters</span>
              </div>
            </div>
          </ConnectionHeader>
          <UsersInfo>
            <ul>
              {props.Userconnectionslist.length > 0 &&
                props.Userconnectionslist.map((Data, Key) => (
                  <li
                    style={
                      props.User.uid === Data.ConnectData.connectid
                        ? { display: "none" }
                        : null
                    }
                    key={Key}
                  >
                    <div className="connect-invite-profile">
                      <div
                        style={{
                          display: "flex",
                          gap: "30px",
                          alignItems: "center",
                        }}
                      >
                        <div className="connect-invite_userphoto">
                          <a>
                            {Data.ConnectData.userInfo.photoURL ? (
                              <img
                                src={Data.ConnectData.userInfo.photoURL}
                                alt=""
                              />
                            ) : (
                              <img src="/images/user.svg" alt="" />
                            )}
                          </a>
                        </div>

                        <div className="connect-invite_user_info">
                          <div className="connect-invite_username">
                            <a>
                              <strong>
                                {Data.ConnectData.userInfo.displayName}
                              </strong>
                            </a>
                          </div>
                          <div className="connect-invite_userdescription">
                            <span>
                              {Data.ConnectData.Description ? (
                                Data.ConnectData.Description
                              ) : (
                                <span>- -</span>
                              )}
                            </span>
                          </div>
                          <div className="connectedtime">
                            <span>Connected 1 day ago</span>
                          </div>
                        </div>
                      </div>
                      <div className="connect-invite-buttons">
                        <Link to={`/messaging/thread/${Data.ConnectData.connectid}`}>
                        <button className="accept">
                          <span>Message</span>
                        </button>
                        </Link>
                        <button className="threedot">
                          <span>
                            <img
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nO3SMQrAIBBE0V95dE3umfUaCYJsEZZUcZNiHtjIH7AQREREfqYAO9ABA7Z5t7pzIzhvpyV0rgeDcbe6cxYMjoTOtWBQEzpX5sjmS+vD53qzExER4TMXBaxSQgA4HO4AAAAASUVORK5CYII="
                              alt=""
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </UsersInfo>
        </ArtCard>
        <div className="footer">
          <Footer />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 80px 110px 0 110px;

  .footer {
    position: sticky;
    top: 70px;
  }
  @media (max-width: 768px) {
    max-width: 420px;
    margin: 80px 0;
    .footer {
      display: none;
    }
  }
`;

const ArtCard = styled.div`
  text-align: center;
  max-height: 100%;
  height: unset;
  width: 804px;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 8px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgba(0 0 0 /20%);

  @media (max-width: 768px) {
    width: 420px;
  }
`;

const UsersInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ul {
    max-height: 100%;
    height: unset;
    overflow-y: hidden;
    width: 100%;
    li {
      padding: 10px 16px;
      display: flex;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      justify-content: flex-start;
      align-items: center;

      @media (max-width: 768px) {
            padding: 8px 6px;
        }
      .connect-invite-profile {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        .connect-invite_userphoto {
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          img {
            cursor: pointer;
            border-radius: 50%;
            width: 72px;
            margin-left: 30px;
            height: 72px;
          }
        }

        .connect-invite_user_info {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          /* margin-right: 50px; */
          flex-direction: column;
          .connect-invite_username {
            a {
              strong {
                color: rgba(0, 0, 0, 0.9);
                line-height: 24px;
                font-size: 16px;
                font-weight: 600;
                margin-right: 4px;
                cursor: pointer;
                &:hover {
                  text-decoration: underline black;
                }
              }
            }
            span {
              color: rgba(0, 0, 0, 0.9);
              line-height: 24px;
              font-size: 16px;
              font-weight: 400;
            }
          }

          .connect-invite_userdescription {
            span {
              color: rgba(0, 0, 0, 0.6);
              line-height: 20px;
              font-size: 14px;
              font-weight: 400;
            }
            @media (max-width: 768px) {
              text-align: start;
            }
          }

          .connectedtime {
            font-size: 12px;
            line-height: 16px;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.6);
          }
        }

        .connect-invite-buttons {
          display: flex;
          background: transparent;
          background-color: #fff;
          button {
            line-height: 20px;
            background: transparent;
            font-size: 16px;
            font-weight: 600;
            border: none;
            outline: none;
            cursor: pointer;
          }
          .threedot {
            span {
              img {
                cursor: pointer;
                margin-left: 6px;
                width: 24px;
                height: 24px;
              }
            }
          }

          .accept {
            padding: 6px 16px;
            border: 1px solid #0a66c2;
            border-radius: 20px;
            span {
              color: #0a66c2;
              width: 49.7px;
              height: 20px;
            }
            &:hover {
              background-color: #ebf4fd;
              color: #ebf4fd;
            }
          }
        }
      }
    }
  }
`;

const ConnectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  /* padding: 16px 24px; */
  .connection_count {
    width: 100%;
    display: flex;
    align-items: flex-start;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    font-size: 18px;
    line-height: 24px;
    padding: 12px 20px 4px 20px;
  }
  .filter_section {
    padding: 0 24px 12px 24px;
    display: flex;
    width: 95%;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
    .sortby {
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
        line-height: 20px;
        span {
          margin-left: 4px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.6);
          font-size: 14px;
          line-height: 20px;
          cursor: pointer;
          img {
            margin-left: 4px;
            width: 12px;
            height: 12px;
          }
        }
      }
    }
    .search {
      display: flex;
      align-items: center;
      gap: 16px;

      span {
        font-weight: 600;
        color: #0a66ce;
        font-size: 14px;
        line-height: 20px;
        cursor: pointer;
        &:hover {
          text-decoration: underline #0a66ce;
        }
      }
      .searchbox {
        width: 200px;
        background-color: #f8fafd;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        outline: rgba(0, 0, 0, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.9);
        @media (max-width: 768px) {
          margin-top: 6px;
            width: 256px;
            height: 28px;
            }
        img {
          position: absolute;
          width: 16px;
          height: 16px;
          padding: 0 3px;
          left: 458px;
          @media (max-width: 768px) {
            padding: 0 6px;
            left: 23px;
            }
        }
        input {
          margin-left: 4px;
          color: rgba(0, 0, 0, 0.9);
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          outline: none;
          border: none;
          background-color: #f8fafd;
          @media (max-width: 768px) {
            width: 224px;
            height: 16px;
            padding: 6px 8px 6px 24px;
            }
        }
      }
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
});

export default connect(mapStateTOProps, mapDispatchToProps)(Myconnections);

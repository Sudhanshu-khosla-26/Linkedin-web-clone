import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  getNetworkAPI,
  getUserconnectionlistAPI,
  getUserconnectInviteSendedAPI,
  getUserconnectInvitesAPI,
} from "../actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { set } from "firebase/database";
import { ref as dbRef } from "firebase/database";
import db from "../firebase";
import { remove } from "firebase/database";

const Grow = (props) => {
  const [filteredConnectionList, setFilteredConnectionList] = useState([]);
  const [showAd, setshowAd] = useState(true);
  // const randomnumberid = Math.floor(Math.random() * 5000);

  const payload = {
    user: props.User,
  };

  const ConnectUser = (userid, invitedUser, Description) => {
    set(dbRef(db, `Users/${userid}/UserConnectionsInvite/${props.User.uid}`), {
      ConnectData: {
        userInfo: props.User,
        connectid: props.User.uid,
        Description: Description,
      },
    });
    set(
      dbRef(db, `Users/${props.User.uid}/UserConnectionInviteSended/${userid}`),
      {
        ConnectData: {
          userInfo: invitedUser,
          connectid: userid,
          Description: Description,
        },
      }
    );
  };

  const AcceptInvite = (userid, userinfo, Description) => {
    set(dbRef(db, `Users/${props.User.uid}/UserConnections/${userid}`), {
      ConnectData: {
        userInfo: userinfo,
        connectid: userid,
        Description: Description,
      },
    });
    set(dbRef(db, `Users/${userid}/UserConnections/${props.User.uid}`), {
      ConnectData: {
        userInfo: props.User,
        connectid: props.User.uid,
        Description: Description,
      },
    });
    remove(
      dbRef(db, `Users/${props.User.uid}/UserConnectionsInvite/` + userid)
    );
    remove(
      dbRef(
        db,
        `Users/${userid}/UserConnectionInviteSended/` + `${props.User.uid}`
      )
    );
  };

  const Ignore = (userid) => {
    remove(
      dbRef(db, `Users/${props.User.uid}/UserConnectionsInvite/` + userid)
    );
    remove(
      dbRef(
        db,
        `Users/${userid}/UserConnectionInviteSended/` + `${props.User.uid}`
      )
    );
  };

  useEffect(() => {
    props.getUserconnectinvites(payload);
    props.getUserconnectionlist(payload);
    props.getUserconnectInviteSended(payload);
    props.getNetwork();
  }, []);

  useEffect(() => {
    if (!(Array.isArray(props.networks) && props.networks.length)) return;

    const alreadyConnectionsIds = props.Userconnectionslist?.map(
      (connection) => connection?.ConnectData?.connectid
    );
    const alreadyinvitedthem = props.UserConnectionsInviteSendedList?.map(
      (connection) => connection?.ConnectData?.connectid
    );
    const alreadyinvitedbysomeone = props.UserConnectionsInviteList?.map(
      (connection) => connection?.ConnectData?.connectid
    );

    const filteredList = props.networks.filter((obj) => {
      if (
        props.User.uid === obj.id ||
        alreadyConnectionsIds?.includes(obj.id) ||
        alreadyinvitedbysomeone?.includes(obj.id) ||
        alreadyinvitedthem?.includes(obj.id)
      )
        return false;
      else return true;
    });

    setFilteredConnectionList(filteredList);
    // console.log('final connections suggestion', filteredList);
  }, [props.networks]);

  if (!props.User) return <div>Loading...</div>;

  return (
    <Container>
      <ArtCard>
        <Invitations>
          <div className="invitationheader">
            <h2>Invitations</h2>
            <a>
              <span>See all {props.UserConnectionsInviteList.length}</span>
            </a>
          </div>

          <UsersInfo>
            <ul>
              {props.UserConnectionsInviteList.length > 0 &&
                props.UserConnectionsInviteList.map((Data, Key) => (
                  <li
                    style={
                      props.User.uid === Data.ConnectData.connectid
                        ? { display: "none" }
                        : null
                    }
                    key={Key}
                  >
                    <div className="connect-invite-profile">
                      <div className="infosection">
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
                            <span>
                              follows you and is inviting you to connect
                            </span>
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
                          <div className="connect-invite_usermutuals">
                            <img src="/images/mutual-icon.png" alt="" />
                            <span>
                              dhruv sabharwal and
                              <span>2 others</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="connect-invite-buttons">
                        <button
                          onClick={() => Ignore(Data.ConnectData.connectid)}
                          className="ignore"
                        >
                          <span>Ignore</span>
                        </button>
                        <button
                          className="accept"
                          onClick={() =>
                            AcceptInvite(
                              Data.ConnectData.connectid,
                              Data.ConnectData.userInfo,
                              Data.ConnectData.Description
                            )
                          }
                        >
                          <span>Accept</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </UsersInfo>
        </Invitations>
      </ArtCard>
      <PremuinAd showAd={showAd}>
        <h3>
          Achieve your goals faster with Premium
          <span onClick={() => setshowAd(false)}>
            <img src="/images/cross-icon.png" alt="" />
          </span>
        </h3>
        <span className="directlymessagead">
          See who's viewed your profile and directly message members outside of
          your network.
        </span>
        <div>
          <>
            <div className="img1">
              <img src="/images/img1.jpeg" alt="" />
            </div>
            <div className="img2">
              <img src="/images/img2.png" alt="" />
            </div>
            <div className="img3">
              <img src="/images/img3.png" alt="" />
              <span>SUDHANSHU and millions of other members use Premium</span>
            </div>
          </>
        </div>
        <a>
          <button>Try Premium for ₹0</button>
        </a>
        <span className="reminder-span">
          1-month free trial. We’ll send you a reminder 7 days before your trial
          ends.
        </span>
      </PremuinAd>

      <SuggestionBox>
        <Headerbox>
          <h2>People you may know in Greater Delhi Area</h2>
          <span>See all</span>
        </Headerbox>
        <ConnectCards>
          {!filteredConnectionList.length ? (
            <div>Loading Suggestions...</div>
          ) : (
            filteredConnectionList.map((Data, Key) => (
              <Card key={Key}>
                <CardBackground />

                <Link style={{ textDecoration: "none" }}>
                  <Photo>
                      {Data?.UserInfo?.profilephoto ? (
                              <img
                                src={Data.UserInfo.profilephoto}
                                alt=""
                              />
                            ) 
                            : (
                              <img src="/images/user.svg" alt="" />
                            )}
                  </Photo>
                  <Links>{Data?.UserInfo?.Name}</Links>
                </Link>
                <a>
                  <UserDescription Description={Data.UserInfo.Description}>
                    {Data.UserInfo.Description ? (
                      Data.UserInfo.Description
                    ) : (
                      <span>- -</span>
                    )}
                  </UserDescription>
                </a>
                <a>
                  <Usermutals>
                    <img src="/images/my photo.jpg" alt="" />
                    <span>
                      Sudhanshu and 67 other
                      <span>mututal connections</span>
                    </span>
                  </Usermutals>
                </a>

                <Connectbtn
                  onClick={() => {
                    ConnectUser(
                      Data.id,
                      Data.UserInfo,
                      Data.UserInfo.Description
                    );
                  }}
                >
                  <span>
                    <img src="/images/connect-person.png" alt="" />
                    Connect
                  </span>
                </Connectbtn>
              </Card>
            ))
          )}
        </ConnectCards>
      </SuggestionBox>
    </Container>
  );
};
const Container = styled.div``;

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
    width: 374px !important;
  }
`;

const UsersInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
  }

  ul {
    max-height: 266px;
    overflow-y: hidden;
    width: 100%;

    @media (max-width: 768px) {
      
      height: unset; 
      max-height: 471px;
      width: 372px;
        }

    li {
      padding: 8px;
      display: flex;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      justify-content: flex-start;
      align-items: center;

      @media (max-width: 768px) {
        height: 140px;
        width: 354px;
        padding: 8px 8px 9px 8px;
      }

      .connect-invite-profile {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        @media (max-width: 768px) {
          flex-direction: column;
        }

        .infosection {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 30px;

          @media (max-width: 768px) {
            flex-direction: row;
          }
        }

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
            word-break: break-word;
            width: 99%;
            text-align: start;
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
              text-align: start;
              color: rgba(0, 0, 0, 0.9);
              line-height: 24px;
              font-size: 16px;
              font-weight: 400;
              /* @media (max-width: 768px) { */
            /* span{ */
              /* margin-left: 4px !important; */
              /* margin-right: 60px !important; */
            /* } */
          /* } */
            }
          }

          .connect-invite_userdescription {
            text-align: start;
            span {
              color: rgba(0, 0, 0, 0.6);
              line-height: 20px;
              font-size: 14px;
              font-weight: 400;
            }
          }

          .connect-invite_usermutuals {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 16px;
              height: 10px;
              margin-top: 2px;
              margin-right: 4px;
            }
            span {
              color: rgba(0, 0, 0, 0.6);
              line-height: 16px;
              font-size: 12px;
              font-weight: 400;
              span {
                margin-left: 4px;
              }
            }
          }
        }

        .connect-invite-buttons {
          display: flex;
          background: transparent;
          background-color: #fff;

          @media (max-width: 768px) {
            padding: 8px 0 0 12px;
            margin: 0 23px 0 0 ;
          }

          button {
            line-height: 20px;
            background: transparent;
            font-size: 16px;
            font-weight: 600;
            border: none;
            outline: none;
            cursor: pointer;
          }
          .ignore {
            padding: 6px 8px;
            margin-right: 12px;
            span {
              width: 47.4px;
              height: 20px;
              color: rgba(0, 0, 0, 0.9);
            }
            &:hover {
              background: rgba(0, 0, 0, 0.05);
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

const Invitations = styled.div`
  .invitationheader {
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px 8px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    h2 {
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.9);
      font-weight: 400;
    }
    span {
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 600;
      padding: 6px;
      cursor: pointer;
      &:hover {
        color: rgba(0, 0, 0, 0.8);
        transition: cubic-bezier(0.075, 0.82, 0.165, 1);
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  @media (max-width: 768px) {
    width: 336 !important;
  }
`;

const PremuinAd = styled(ArtCard)`
  margin-top: 20px;
  height: 158.98px;
  padding: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  ${(props) =>
    props.showAd === false &&
    `
        display: none;
  `}
  @media (max-width: 768px) {
    width: 350px !important;
    height: 184.49px;
    .directlymessagead {
      width: 100%;
      margin-left:0;
      text-align: start;
      /* font-size: 12px; */
      /* line-height: 16px; */
    }
  }

  h3 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 8px;

    img {
      width: 16px;
      height: 16px;
    }
    @media (max-width: 768px) {
      margin-bottom: 3px;
    }
  }

  span {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 8px;

    @media (max-width: 768px) {
      margin-bottom: 3px;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      margin-bottom: 3px;
    }
    & > div {
      border-radius: 50%;

      img {
        border-radius: 50%;
        width: 28px;
        height: 28px;
      }
    }
    .img1 {
      position: relative;
    }
    .img2 {
      position: relative;
      right: 10px;
    }
    .img3 {
      position: relative;
      right: 20px;
      span {
        font-size: 12px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.6);
        font-weight: 400;
        margin-top: 4px;
        margin-left: 8px;

        @media (max-width: 768px) {
          margin-left: 4px !important;
        }
      }
    }
  }

  button {
    line-height: 20px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    border: 0;
    border-radius: 20px;
    outline: 0;
    background-color: #f9c982;
    padding: 6px 16px;
    span {
      width: 139.6px;
      height: 20px;
    }
    &:hover {
      background-color: #e9a53f;
    }
  }

  .reminder-span {
    text-align: start;
    margin-top: 8px;
    line-height: 15px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    @media (max-width: 768px) {
      margin-left: 4px;
    }
  }
`;

const SuggestionBox = styled(ArtCard)`
  margin-top: 20px;
`;

const Headerbox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 4px 16px;
  

  h2 {
    text-align: start;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
  }
  span {
    cursor: pointer;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: rgba(0, 0, 0, 0.8);
    }
  }

  @media (max-width: 768px) {
    h2{
      font-size: 14px;
    }
    span{
      font-size: 14px
    }
  }

`;

const ConnectCards = styled.div`
  width: 772px;
  min-height: 268px;
  height: unset;
  /* max-height: 588px; */
  field-sizing: content;
  margin: 12px 16px 6px 16px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  @media (max-width: 768px) {
    width: 348px !important;
    overflow-y: scroll;
    min-height: 600px;
    height: unset;
    margin: 12px 10px 6px 16px;
    gap: 14px;
  }
`;

const Card = styled(ArtCard)`
  width: 184px;
  margin-right: 9px;
  height: 288px;
  margin-bottom: 18px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
      rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
      rgba(0, 0, 0, 0.09) 0px 32px 16px;
  }

  @media (max-width: 768px) {
    width: 164px !important;
    margin-right: 0;
    margin-left: 2px;
  }
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 62px;
`;

const Photo = styled.div`
  box-shadow: none;
  /* background-image: url("/images/photo.svg"); */
  width: 104px;
  height: 104px;
  box-sizing: border-box;
  /* background-clip: content-box; */
  background-color: white;
  /* background-position: center; */
  /* background-size: 60%; */
  /* background-repeat: no-repeat; */
  margin: -52px auto 0 auto;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 104px;
    /* border: 2px solid white; */
    border-radius: 50%;
    height: 104px;
  }
`;

const Links = styled.div`
  font-size: 16px;
  text-decoration: none;
  margin-top: 8px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
  cursor: pointer;
  font-weight: 600;
  &:hover {
    text-decoration: underline black;
  }
`;

const UserDescription = styled.div`
  color: rgba(0, 0, 0, 0.6);
  margin-top: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  ${(props) =>
    props.Description === "" &&
    `
    margin-top: 23px;
  `}

  @media (max-width: 768px) {
    font-size:14px;  
  }
`;

const Usermutals = styled.div`
  margin: 16px 0 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
  span {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Connectbtn = styled.button`
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 20px;
  outline: none;
  background: transparent;
  padding: 6px 16px;
  border: 1px solid #0a66c2;
  width: 128px;
  span {
    color: #0a66c2;
    height: 20px;
    img {
      width: 13px;
      height: 13px;
      margin-right: 4px;
    }
  }
  &:hover {
    background-color: #ebf4fd;
    border: 1px solid #004182;
    span {
      color: #004182;
    }
  }
`;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem("User")),
    networks: state.articleState.networks,
    Userconnectionslist: state.articleState.Userconnectionslist,
    UserConnectionsInviteList: state.articleState.UserConnectionsInviteList,
    UserConnectionsInviteSendedList:
      state.articleState.UserConnectionsInviteSendedList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getNetwork: () => dispatch(getNetworkAPI()),
  getUserconnectionlist: (payload) =>
    dispatch(getUserconnectionlistAPI(payload)),
  getUserconnectinvites: (payload) =>
    dispatch(getUserconnectInvitesAPI(payload)),
  getUserconnectInviteSended: (payload) =>
    dispatch(getUserconnectInviteSendedAPI(payload)),
  // getAritcles: (payload) => dispatch(getAritcleAPI(payload)),
});

export default connect(mapStateTOProps, mapDispatchToProps)(Grow);

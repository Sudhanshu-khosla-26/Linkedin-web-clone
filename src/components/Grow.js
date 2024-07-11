import styled from "styled-components";
import { Link } from "react-router-dom";

const Grow = () => {
  return (
    <Container>
            <ArtCard>
                <Invitations>
                    <div className="invitationheader">
                        <h2>Invitations</h2>
                        <a>
                          <span>
                              See all 28
                          </span>
                        </a>
                    </div>
                    
                    <UsersInfo>        
                            <ul>
                      <li>
                        <div className="connect-invite-profile">
                          <div className="connect-invite_userphoto">
                            <a>
                            <img src="/images/user.svg" alt="" />
                            </a> 
                          </div>

                        <div className="connect-invite_user_info">
                          <div className="connect-invite_username">
                            <a>
                              <a>
                                <strong>Dhruv Sabherwal</strong>
                              </a>
                            </a>
                            <span>follows you and is inviting you to connect</span>
                          </div>
                          <div className="connect-invite_userdescription">
                            <span>AI/ML Student at Galgotias College of Engineering and Technology | Passionate...</span>
                          </div>
                          <div className="connect-invite_usermutuals">
                            <img src="/images/mutual-icon.png" alt="" />
                            <span>
                              dhruv sabharwal and 
                              <span>
                                   2 others
                              </span>                             
                            </span>
                          </div>
                        </div>
                          <div className="connect-invite-buttons">
                            <button className="ignore">
                              <span>Ignore</span>
                            </button>
                            <button className="accept">
                              <span>
                                Accept
                              </span>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="connect-invite-profile">
                          <div className="connect-invite_userphoto">
                            <a>
                            <img src="/images/user.svg" alt="" />
                            </a> 
                          </div>

                        <div className="connect-invite_user_info">
                          <div className="connect-invite_username">
                            <a>
                              <a>
                                <strong>Vaibhav Khana</strong>
                              </a>
                            </a>
                            <span>follows you and is inviting you to connect</span>
                          </div>
                          <div className="connect-invite_userdescription">
                            <span>AI/ML Student at Galgotias College of Engineering and Technology | Passionate...</span>
                          </div>
                          <div className="connect-invite_usermutuals">
                            <img src="/images/mutual-icon.png" alt="" />
                            <span>
                              dhruv sabharwal and 
                              <span>
                                   2 others
                              </span>                             
                            </span>
                          </div>
                        </div>
                          <div className="connect-invite-buttons">
                            <button className="ignore">
                              <span>Ignore</span>
                            </button>
                            <button className="accept">
                              <span>
                                Accept
                              </span>
                            </button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="connect-invite-profile">
                          <div className="connect-invite_userphoto">
                            <a>
                            <img src="/images/user.svg" alt="" />
                            </a> 
                          </div>

                        <div className="connect-invite_user_info">
                          <div className="connect-invite_username">
                            <a>
                              <a>
                                <strong>Avi Budacoti</strong>
                              </a>
                            </a>
                            <span>follows you and is inviting you to connect</span>
                          </div>
                          <div className="connect-invite_userdescription">
                            <span>AI/ML Student at Galgotias College of Engineering and Technology | Passionate...</span>
                          </div>
                          <div className="connect-invite_usermutuals">
                            <img src="/images/mutual-icon.png" alt="" />
                            <span>
                              dhruv sabharwal and 
                              <span>
                                   2 others
                              </span>                             
                            </span>
                          </div>
                        </div>
                          <div className="connect-invite-buttons">
                            <button className="ignore">
                              <span>Ignore</span>
                            </button>
                            <button className="accept">
                              <span>
                                Accept
                              </span>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                    </UsersInfo>
                </Invitations>
             </ArtCard>
            <PremuinAd>
              <h3>Achieve your goals faster with Premium
                <span>
                  <img src="/images/cross-icon.png" alt="" />
                </span>
              </h3>
              <span>See who's viewed your profile and directly message members outside of your network.</span>
              <div>
              <>
                <div className="img1">
                  <img src="/images/img1.jpeg" alt="" />
                </div>
                <div className="img2">
                  <img src="/images/img2.png" alt="" />
                </div>
                <div className="img3" >
                  <img src="/images/img3.png" alt="" />
                <span>SUDHANSHU and millions of other members use Premium</span>
                </div>
              </>
              </div>
              <a>
                <button>
                  Try Premium for ₹0
                </button>
              </a>
              <span className="reminder-span">
              1-month free trial. We’ll send you a reminder 7 days before your trial ends.
              </span>
            </PremuinAd>

            <SuggestionBox>
              <Headerbox>
                <h2>People you may know in Greater Delhi Area</h2>
                <span>See all</span>
              </Headerbox>
              <ConnectCards>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
                <Card>
                  <CardBackground />

          <Link style={{textDecoration: "none"}}>
            <Photo>
                <img src="/images/my photo.jpg" alt="" />
            </Photo>
            <Links>
              Vaibhav Khanna
            </Links>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
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

          <Connectbtn>
            <span>
              <img src="/images/connect-person.png" alt="" />
              Connect
            </span>
          </Connectbtn>
                </Card>
              </ConnectCards>
            </SuggestionBox>
    </Container>
  )
}

export default Grow;

const Container = styled.div`

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

`;

const UsersInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ul{
    width: 100%;
    li{
        padding: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

      .connect-invite-profile{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        .connect-invite_userphoto{
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          img{
            cursor: pointer;
            border-radius: 50%;
            width: 72px;
            margin-left: 30px;
            height: 72px;
          }
        }

        .connect-invite_user_info{
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          /* margin-right: 50px; */
          flex-direction: column;
          .connect-invite_username{

            a{
              strong{
              color: rgba(0,0,0,0.9);
              line-height: 24px;
              font-size: 16px;
              font-weight: 600;
              margin-right: 4px;
              cursor: pointer;
              &:hover{
                text-decoration: underline black;
              }
            }
          }
          span{
              color: rgba(0,0,0,0.9);
              line-height: 24px;
              font-size: 16px;
              font-weight: 400;
            }
          }

          .connect-invite_userdescription{
            span{
              color: rgba(0,0,0,0.6);
              line-height: 20px;
              font-size: 14px;
              font-weight: 400;
            }
          }

          .connect-invite_usermutuals{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img{
              width: 16px;
              height: 10px;
              margin-top: 2px;
              margin-right: 4px;
            }
            span{
              color: rgba(0,0,0,0.6);
              line-height: 16px;
              font-size: 12px;
              font-weight: 400;
              span{
                margin-left: 4px;
              }
            }
          }
        }

          .connect-invite-buttons{
            display: flex;
            background: transparent;
            background-color: #fff;
            button{
              line-height: 20px;
              background: transparent;
              font-size: 16px;
              font-weight: 600;
              border: none;
              outline: none;
              cursor: pointer;
            }
            .ignore{
              padding: 6px 8px;
              margin-right: 12px;
              span{
                width: 47.4px;
                height: 20px;
                color: rgba(0,0,0,0.9);
              }
              &:hover{
                background: rgba(0,0,0,0.05);
              }
            }
            .accept{
              padding: 6px 16px;
              border: 1px solid #0a66c2;
              border-radius: 20px;
              span{
                color:#0a66c2;
                width: 49.7px;
                height: 20px;
            }
            &:hover{
              background-color: #ebf4fd ;
              color: #ebf4fd;
            }
            }
          }

      }
    }
  }
`;

const Invitations = styled.div`
  .invitationheader{
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 8px 8px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    h2{
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.9);
      font-weight: 400;
    }
    span{
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 600;
      padding: 6px;
      cursor: pointer;
      &:hover{
        color: rgba(0, 0, 0, 0.8);
        transition: cubic-bezier(0.075, 0.82, 0.165, 1);
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
`;

const PremuinAd = styled(ArtCard)`
  margin-top: 20px;
  width: 772px;
  height: 158.98px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  
  h3{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 20px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0,0,0,0.9);
    margin-bottom: 8px;

    img{
      width: 16px;
      height: 16px;
    }
  }

  span{
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(0,0,0,0.9);
    margin-bottom: 8px;
  }

  div{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 8px;
    & > div{
      border-radius: 50%;

      img{
          border-radius: 50%;
          width: 28px;
          height: 28px;
        }
      }
      .img1{
        position: relative;
      }
      .img2{
        position: relative;
        right: 10px;
      }
      .img3{
        position: relative;
        right: 20px;
        span{
          font-size: 12px;
          line-height: 16px;
          color: rgba(0,0,0,0.6);
          font-weight: 400;
          margin-top: 4px;
          margin-left: 8px;
        }
      }
  }

  button{

    line-height: 20px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(0,0,0,0.9);
    border: 0;
    border-radius: 20px;
    outline: 0;
    background-color: #F9C982;
    padding: 6px 16px;
    span{
      width: 139.6px;
      height: 20px;
    }
    &:hover{
      background-color: #E9A53F;
    }
  }

  .reminder-span{
    margin-top: 8px;
    line-height: 15px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(0,0,0,0.6);
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

    h2{
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;
      color: rgba(0,0,0,0.9);
    }
    span{
      cursor: pointer;
      font-weight: 600;
      color: rgba(0,0,0,0.6);
      font-size: 16px;
      line-height: 20px;
      padding: 8px;
      &:hover{
        background-color: rgba(0,0,0,0.05);
        color: rgba(0,0,0,0.8);
      }
    }
`;

const ConnectCards = styled.div`
  width: 772px;
  height: 588px;
  margin: 12px 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Card = styled(ArtCard)`
  width: 184px;
  height: 288px;
  margin-bottom: 18px;
  &:hover{
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
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
  margin: -52px 0 0 40px;
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
  &:hover{
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
`;

const Usermutals = styled.div`
  margin: 16px 0 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
  span{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.6);
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
  span{
    color:#0a66c2;
    height: 20px;
    img{
      width: 13px;
      height: 13px;
      margin-right: 4px;
    }
  }
    &:hover{
      background-color: #ebf4fd ;
      border: 1px solid #004182;
      span{
        color: #004182;
      }
  }

`;
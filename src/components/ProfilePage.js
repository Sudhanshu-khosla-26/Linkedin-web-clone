import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePage = (props) => {
    return (
        <Container>
            <ArtCard>
                <UserInfo>
                    <CardBackground />
                        <Photo>
                            {props.User ? (
                                <img src={props.User.photoURL} alt="" />
                            ) : (
                                <img src="/images/user.svg" alt="" />
                            )}
                        </Photo>
                    <div className="profileinfo">
                    <div>

                        <Links>
                            {props.User ? props.User.displayName : "Add UserName"}
                        </Links>
                    <a>
                        <UserDescription>
                            Frontend Developer | Btech 1st Year Student |
                        </UserDescription>
                    </a>
                    <a>
                        <UserAddress>New Delhi, Delhi</UserAddress>
                    </a>
                    </div>
                    <div>
                    <a>
                        <UserInstitute>
                            <img src="/images/college.png" alt="" />
                            <span>Guru Tegh Bahadur 4th Centenary Engineering College</span>
                        </UserInstitute>
                    </a>
                    </div>
                    </div>
                </UserInfo>
            </ArtCard>
            <ConnectionsSuggestion>
                <div className="url_and_language">
                    <div className="language">
                        <span>

                        </span>
                        <Link>
                            <img src="" alt="" />
                        </Link>
                    </div>
                    <div className="public">
                        <span>

                        </span>
                        <Link>
                            <img src="" alt="" />
                        </Link>
                    </div>Url
                </div>
            </ConnectionsSuggestion>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 80px 0 0 0;
  justify-content: center;
  gap: 25px;
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

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
  text-align: start;
  width: 780px;

  .profileinfo{
    display: flex;
    justify-content: space-between;

  }

  Link{
    text-decoration: none !important;
  }

  a {
    cursor: pointer;
  }
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 804px;
  padding-bottom: 201px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;
  /* background-image: url("/images/photo.svg"); */
  width: 152px;
  height: 152px;
  box-sizing: border-box;
  /* background-clip: content-box; */
  background-color: white;
  /* background-position: center; */
  /* background-size: 60%; */
  /* background-repeat: no-repeat; */
  margin: -115px 0 0 10px;
  border-radius: 50%;
  img {
    width: 152px;
    height: 152px;
    border: 3px solid white;
    border-radius: 50%;
  }
`;

const Links = styled.div`
  font-size: 24px;
  text-decoration: none;
  margin-top: 8px;
  line-height: 30px;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const UserDescription = styled.div`
  color: rgba(0, 0, 0, 0.9);
  margin-top: 4px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
`;

const UserAddress = styled(UserDescription)`
  line-height: 18px;
  font-size: 14px;
  color: rgba(0,0,0,0.6);
`;

const UserInstitute = styled(UserDescription)`
  img {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgba(0,0,0,0.9);
  line-height: 18px;
  font-size: 14px;
  width: 192px;
  max-height: 35px;
  &:hover{
    color: rgb(10, 102, 194);
  }
`;

const ConnectionsSuggestion = styled(ArtCard)`
    .url_and_language{
        width: 268px;
        height: 150px;
        padding: 16px;
    }
`;

const mapStateTOProps = (state) => {
    return {
        User: JSON.parse(localStorage.getItem('User')),

    };
};

const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateTOProps, mapDispatchToProps)(ProfilePage);
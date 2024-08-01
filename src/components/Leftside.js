import styled from "styled-components";
import { connect } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Leftside = (props) => {
  const [DropdownInfo, setDropdownInfo] = useState(false);
  // console.log(props.user);
  return (
    <Container>
      <ArtCard>
        <UserInfo>
          <CardBackground />

          <Link style={{textDecoration: "none"}} to={`/in/${props.User.displayName}-${props.User.uid}/`}>
            <Photo>
              {props.User ? (
                <img src={props.User.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
            </Photo>
            <p style={{color: "rgba(0,0,0,0.9", textDecoration: "none", marginTop: "4px", padding: "0"}}>
              {props.User ? props.User.displayName : "Add UserName"}
            </p>
          </Link>
          <a>
            <UserDescription>
              Frontend Developer | Btech 2st Year Student |
            </UserDescription>
          </a>
          <a>
            <UserAddress>New Delhi, Delhi</UserAddress>
          </a>
          <a>
            <UserInstitute>
              <img src="/images/college.png" alt="" />
              <span>Guru Tegh Bahadur 4th Centenary Engineering College</span>
            </UserInstitute>
          </a>
        </UserInfo>
      </ArtCard>

    <Widget dropdownInfo={DropdownInfo}>
          <a>
            <div>
              <span>Boost your job search with Premium</span>
              <span>
                <img src="/images/golden.jpeg" alt="" />
                Try Premium for ₹0
              </span>
            </div>
            {/* <img src="/images/widget-icon.svg" alt="" /> */}
          </a>
        </Widget>

      <CommunityCard dropdownInfo={DropdownInfo}>
        <Item>
          <a>
            <span>
              Profile viewers <span>40</span>
            </span>
          </a>
          <a>
            <span>View all analytics</span>
          </a>
        </Item>

        <a>
          <span>
            <img src="/images/item-icon.svg" alt="" />
            Saved items
          </span>
        </a>
        <a>
          <span>
            <img src="/images/group-icon.png" alt="" />
            Groups
          </span>
        </a>
        <a>
          <span>
            <img src="/images/events-icon.png" alt="" />
            Events
          </span>
        </a>
      </CommunityCard>

      <ShowMore onClick={() => {DropdownInfo? setDropdownInfo(false) : setDropdownInfo(true)}}>
        <span>Show more
          {!DropdownInfo ?
          <img src="/images/arrow-down.png" alt=""/>
          :
          <img src="/images/arrow-up.png" alt=""/>
        }
        </span>
      </ShowMore>
    </Container>
  );
};
  
const Container = styled.div`
  grid-area: leftside;
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
  background-size: 462px;
  height: 60px;
  margin: -12px -12px 0;
`;

const Photo = styled.div`
  box-shadow: none;
  /* background-image: url("/images/photo.svg"); */
  width: 72px;
  height: 72px;
  box-sizing: border-box;
  /* background-clip: content-box; */
  background-color: white;
  /* background-position: center; */
  /* background-size: 60%; */
  /* background-repeat: no-repeat; */
  margin: -38px 0 0 0;
  border-radius: 50%;
  img {
    width: 72px;
    border: 2px solid white;
    border-radius: 50%;
    height: 72px;
  }
`;

const Links = styled.div`
  font-size: 20px;
  text-decoration: none;
  margin-top: 8px;
  line-height: 25px;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const UserDescription = styled.div`
  color: rgba(0, 0, 0, 0.9);
  margin-top: 4px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
`;

const UserAddress = styled(UserDescription)`
  color: gray;
`;

const UserInstitute = styled(UserDescription)`
  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  display: flex;
  align-items: center;
  font-weight: 600;
  color: rgba(0,0,0,0.9);
  line-height: 15px;
`;

const Widget = styled(ArtCard)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;

  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;


    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      img{
        height: 12px;
        width: 12px;
        margin-right: 4px;

      }
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:last-child {
          display: flex;
          align-items: center;
          color: rgba(0, 0, 0, 1);
          &:hover {
            color: #0a66c2;
          }
        }
      }
    }

   
};
  svg {
    color: rgba(0, 0, 0, 1);
  }

 @media (max-width: 768px) { 
   ${props => props.dropdownInfo === false && `
      display: none;
      `}
  }
`;

const Item = styled.a`
  border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  /* padding: 12px; */
  display: block;
  span {
    font-size: 12px;
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 600;
    span {
      margin-top: 8px;
      color: #0a66c2;
    }
  }

  /* &:last-child{ */
  /* border-bottom: 1px solid rgba(0,0,0,0.8); */
  /* padding-bottom: 8px; */
  /* } */

  a {
    text-decoration: none;
    span {
      &:hover {
        text-decoration: underline black !important;
      }
    }
  }
`;

const CommunityCard = styled(ArtCard)`
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 0px 16px  8px 16px;

  /* @media (max-width: 768px) {
    display: none;
  } */

  a {
    color: rbga(0, 0, 0, 0.9);
    padding: 8px 0px 8px 0px;
    font-size: 12px;
    line-height: 16px;

    img {
      width: 16px;
      height: 16px;
    }


    span {
      display: flex;
      align-items: center;
      /* padding: 8px 0 ; */
      gap: 6px;
      &:hover {
        text-decoration: underline #0a66c2;
        /* color: #0a66c2; */
      }
      /* justify-content: space-between; */
    }

    /* &:last-child { */
    /* color: rgba(0, 0, 0, 0.6); */
    /* text-decoration: none; */

    /* padding: 12px; */
    /* &:hover { */
    /* background-color: rgba(0, 0, 0, 0.08); */
    /* } */
    /* } */

    &:nth-child(1) {
      border-bottom: 1px solid #d6cec2;
      /* border-bottom: 1px solid rgba(0,0,0,0.8); */
      padding-bottom: 8px;
    }
  }

  @media (max-width: 768px) { 
   ${props => props.dropdownInfo === false && `
      display: none;
      `}
  }
`;

const ShowMore = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 20px;
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 8px 2px 8px;
    span{
      display: flex;
      align-items: center;  
      line-height: 20px;
      font-size: 14px;
      color: rgba(0,0,0,0.75);
      img{
        height: 14px;
        width: 14px;
        margin-left: 4px;
      }
    }
  }
`;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem('User')),
    // user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateTOProps, mapDispatchToProps)(Leftside);

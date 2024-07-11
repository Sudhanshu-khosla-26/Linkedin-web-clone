import styled from "styled-components";
import Footer from "./Footer";
import Grow from "./Grow";
import { useState } from "react";

const MyNetwork = () => {
  const [DropdownInfo, setDropdownInfo] = useState(false);
  return (
    <>
      <Container>
        <div>
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
                <span>
                  <img src="/images/connections-icon.png" alt="" />
                  Connections
                </span>
                <span>198</span>
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
          <Footer />
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
      </Container>
    </>
  );
};

export default MyNetwork;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 80px auto 0 auto;
  width: 84%;
  justify-content: space-between;
  gap: 30px;
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

const Networkfooter = styled.div`
  width: 300px;
  max-height: 405px;

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
`;

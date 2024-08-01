import styled from "styled-components";
import Footer from "./Footer";

const Rightside = (props) => {
  return (
    <Container>
      <FollowCard>
        <Title>
          <h2>LinkedIn News</h2>
          <img src="/images/feed-icon.svg" alt="" />
        </Title>

        <FeedList>
          <span>Top stories</span>
          <li>
            <span>
                Auxilo Finserve raises $33 million
              <span>
                9h ago • 32,201 readers
              </span>
            </span>
          </li>
          <li>
          <span>
              DLF most-valued realty firm
              <span>
              9h ago • 3,904 readers
              </span>
            </span>
          </li>
          <li>
          <span>
          More firms head to Chennai
              <span>
              8h ago • 3,341 readers
              </span>
            </span>
          </li>
          <li>
          <span>
          Insurers hike premium rates
              <span>
              9h ago • 2,380 readers
              </span>
            </span>
          </li>
          <li>
          <span>
          Career lessons for freshers
              <span>
              8h ago • 2,158 readers
              </span>
            </span>
          </li>

          <div className="showmore">
            <span>
              Show more 
              <img src="/images/arrow-down.png" alt="" />
            </span>
          </div>
        </FeedList>


        <Games>
          <span>
          Today’s games
          <span>
            NEW
          </span>
          </span>

          <li>
            <div>
              <img src="/images/PINPOINT.svg" alt="" />
            </div>
            <span>
                Pinpoint #78
              <span>
              Guess the category
              </span>
            </span>
          </li>
          <li>
            <div>
              <img src="/images/QUEENS.svg" alt="" />
            </div>
            <span>
              Queens #78
              <span>
              Crown each region
              </span>
            </span>
          </li>
          <li>
            <div>
              <img src="/images/CROSSCLIMB.svg" alt="" />
            </div>
            <span>
              Crossclimb #78
              <span>
                  Unlock a trivia ladder
              </span>
            </span>
          </li>
        </Games>
      </FollowCard>
      {/* <BannerCard>
        <img
          src="/images/hire-ad.png"
          alt=""
        />
      </BannerCard> */}
      <div className="footer">
        <Footer/>
      </div>
    </Container>
  );
};

const Container = styled.div`
  grid-area: rightside;

  .footer{
    position: sticky;
    top: 60px;
  }

  @media(min-width: 768px) and (max-width:860px){
    display: none;
  }
`;

const FollowCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px 12px  12px  0 ;
`;

const Title = styled.div`
  /* margin: 0 12px 0 12px ; */
  padding: 0 0 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  width: 96%;
  font-weight: 600;
  line-height: 26px;
  color: rgba(0, 0, 0, 0.7);
  img{
    cursor: pointer;
  }
`;

const FeedList = styled.ul`
  
  margin-top: 6px;

  span{
    display: flex;
    padding: 0 12px;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: 20px;
    font-weight: 600;
    font-size: 16px;
    color: rgba(0,0,0,0.6);
  }

  li {
    cursor: pointer;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    margin: 4px 0 0 0 ;
    position: relative;
    text-align: start;
    
    &:hover{
      background-color: rgba(0,0,0,0.1)
    }

    span{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      line-height: 20px;
      padding: 0;
    font-weight: 600;
    font-size: 14px;
    color: rgba(0,0,0,0.9);
      span{
        line-height: 16px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(0,0,0,0.6);
    padding: 0;
      }
    }
  }

  .showmore{
    text-align: start;
    margin-top: 4px;
    padding-left: 2px;
    width: fit-content;
    span{
      /* padding: 0; */
      /* margin: 0; */
      cursor: pointer;
      &:hover{
        background-color: rgba(0,0,0,0.1)
      }
      display: flex;
      flex-direction: row;
      align-items: center;
      /* justify-content: center; */
      line-height: 20px;
    font-weight: 600;
    font-size: 14px;
    color: rgba(0,0,0,0.9);
      img{
        margin-left: 4px;
        width: 10px;
        height: 7px;
      }
    }
  }
`;


const Games = styled.a`
  span{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 16px 0 0 12px;
    line-height: 20px;
    font-weight: 600;
    font-size: 16px;
    color: rgba(0,0,0,0.9);
    span{
      padding: 1px 8px;
      margin-left: 4px;
      line-height: 18px;
    font-weight: 600;
    font-size: 14px;
    border-radius: 8px;
    background-color: #FCE3BC;
    color: rgb(82, 58, 81);
  }
  }

  li{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 12px;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.1)
      }
    margin: 8px 0; 
    & div{
      img{

      }
    }
    span{ 
      background-color: transparent;
      margin-left: 6px;
      padding: 0;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      line-height: 20px;
    font-weight: 600;
    font-size: 14px;
    color: rgba(0,0,0,0.9);
    span{
        margin: 0;
      background-color: transparent;
        line-height: 16px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(0,0,0,0.6);
      }
    }
  }

`;



export default Rightside;
import styled from "styled-components";
import { getUserconnectionlistAPI } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const SideChat = ({name, userPhoto, id}) => {

    // useEffect(() => {
    // const payload = {
    //     user: props.User,
    // }   
    // props.getUserconnectionlist(payload);
    // console.log(props.Userconnectionslist);
    // }, [])
  

  return (
    <>
        <Container>
          {/* <Link to={`/messaging/thread/`}>
            <div className="sidechat activechat">
                    <div className="left_border active"></div>
                    <div className="usersidechatinfo">
                      <div className="userimage">
                        <img src="/images/my photo.jpg" alt="" />
                      </div>
                      <div className="userinfo">
                        <div className="username">

                      <span>
                        Sudhanshu Khosla
                      </span>
                      <span>
                            July 20
                      </span>
                        </div>
                      <span className="lastmessage">
                        You sent a post
                      </span>
                      </div>
                    </div>
                  
            </div>
          </Link> */}
          <Link to={`/messaging/thread/${id}`}>
            <div className="sidechat">
                    <div className="left_border"></div>
                    <div className="usersidechatinfo">
                      <div className="userimage">
                        <img src={userPhoto} alt="" />
                      </div>
                      <div className="userinfo">
                        <div className="username">

                      <span>
                        {name}
                      </span>
                      <span>
                            July 20
                      </span>
                        </div>
                      <span className="lastmessage">
                        You sent a post
                      </span>
                      </div>
                    </div>
                  
            </div>
          </Link>

        </Container>
    </>
  )
}


const Container = styled.div`
  width: 295.4px;


  a{
    text-decoration: none !important;
    color: rgba(0,0,0,0.9);
    &:active{
      color: rgba(0,0,0,0.9);
      text-decoration: none;
    }

    .activechat{
        background-color: #EDF3F8 !important;
        &:hover{
        background-color: #EBEBEB !important;
        }
    }

    .sidechat{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 92px;
      width: 324px;
      border-bottom: 1px solid rgba(0,0,0,0.1);
      /* border-right: 1px solid #EBEBEB; */
      &:hover{
        background-color: #EBEBEB;
        }


      .left_border{
        padding: 92px 5px 0 0;
        border-radius: 0;
        
      }
      
      .active{
        background-color: #01754F ;
      }
      
      .usersidechatinfo{
        padding-left: 12px;
        display: flex;
      }

      .userimage{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          border-radius: 50%;
          width: 56px;
          height: 56px;
        }
      }
    
      .userinfo{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        flex-grow: 1;
        padding: 12px 8px;
        height: 67px;
        width: 234.4px;
        .username{
          width: 224.4px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          span{  
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
        }

      }
        
        .lastmessage{
          text-align: start;
          font-size: 14px;
          justify-content: flex-start;
          font-weight: 400;
          line-height: 20px;
          color: rgba(0,0,0,0.6);
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
    getUserconnectionlist: (payload) =>dispatch(getUserconnectionlistAPI(payload)),


    // getAritcles: (payload) => dispatch(getAritcleAPI(payload)),
  });
  
  export default connect(mapStateTOProps, mapDispatchToProps)(SideChat);
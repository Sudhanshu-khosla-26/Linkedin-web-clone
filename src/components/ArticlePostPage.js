import { useEffect } from "react";
import styled from "styled-components";
import { onValue } from "firebase/database";
import db from "../firebase";
import { ref as dbRef } from "firebase/database";
import { set , remove} from "firebase/database";
import { useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser"
import { connect } from "react-redux";
import FloatingChatbar from "./FloatingChatbar";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const ArticlePostPage = (props) => {
    const navigate = useNavigate();
    const { ArticleTitle } = useParams();
    const { ArticlePosterName } = useParams();
    const { ArticleKey } = useParams();
    const { ArticlePosterid } = useParams();
    const { ArticlePostid } = useParams();
    const [ARTICLEINFO, setARTICLEINFO] = useState([]);
    const [showDeleteBox, setshowDeleteBox] = useState("");
    const [input, setInput] = useState("");
    const [emojibox, setemojibox] = useState(false);
    const monthlist = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const id = (Math.floor(Math.random() * 5000));


    
    useEffect(() => {
        onValue(dbRef(db, `Users/${ArticlePosterid}/UserPost/${ArticlePostid}`), (snapshot) => {
            const data = snapshot.val();
            setARTICLEINFO(data);
          });
    }, [])


    const content = `${ARTICLEINFO?.Article?.Paragraph}`;
    const reactElement = parse(content);

    const onEmojiClick = (event) => {
      setInput((prevInput) => prevInput + event.emoji);
      // console.log(input, "emoji ");
    };

    const LikePost = (userid, postid, Description, Key) => {
      set(
        dbRef(
          db,
          `Users/${props.User.uid}/UserFeed/Posts/${Key}/Likes/${props.User.uid}`
        ),
        {
          ConnectData: {
            userInfo: props.User,
            connectid: props.User.uid,
            Description: Description,
          },
        }
      );
      set(
        dbRef(db, `Users/${userid}/UserPost/${postid}/Likes/${props.User.uid}`),
        {
          ConnectData: {
            userInfo: props.User,
            connectid: props.User.uid,
            Description: Description,
          },
        }
      );
    };
  
    const UnLikePost = (userid, postid, key) => {
      remove(
        dbRef(
          db,
          `Users/${userid}/UserPost/${postid}/Likes/` + `${props.User.uid}`
        )
      );
      remove(
        dbRef(
          db,
          `Users/${props.User.uid}/UserFeed/Posts/${key}/Likes/` +
            `${props.User.uid}`
        )
      );
      // console.log("unliked");
    };
  

    const CommentPost = (userid, postid, Description, key) => {
      set(
        dbRef(
          db,
          `Users/${userid}/UserPost/${postid}/comments/${id}/`
        ),
        {
          commentid: `${id}`,
          userInfo: props.User,
          connectid: props.User.uid,
          Description: Description,
          comment: input,
          commenterid: props.User.uid,
          timestamp: Timestamp.now(),
        }
      );
      set(
        dbRef(
          db,
          `Users/${props.User.uid}/UserFeed/Posts/${key}/comments/${id}/`
        ),
        {
          commentid: `${id}`,
          userInfo: props.User,
          connectid: props.User.uid,
          Description: Description,
          comment: input,
          commenterid: props.User.uid,
          timestamp: Timestamp.now(),
        }
      );
      // console.log(input);
      setInput("");
      setemojibox(false);
    };

    const removeComment = (userid, postid,commentid, key) => {
      remove(
        dbRef(
          db,
          `Users/${userid}/UserPost/${postid}/comments/${commentid}/`
        )
      );
      remove(
        dbRef(
          db,
          `Users/${props.User.uid}/UserFeed/Posts/${key}/comments/${commentid}/`
        )
      );
      setshowDeleteBox("");
    }

    // console.log(Object.keys(ARTICLEINFO.Likes).length);

    // console.log(extractContent(ARTICLEINFO?.Article?.Paragraph))
    // console.log(ArticlePosterid);
    !props.User && navigate("/")
    return (
      ARTICLEINFO ? 
      <>
    <Container> 
        <div className="article">
            <div className="titleimg">
                <img src={ARTICLEINFO?.Article?.TitleImage} alt="" />
            </div>
            <div className="Title">
            <span >
                {ARTICLEINFO?.Article?.Title}
            </span>
            </div>
            <div className="articleposterinfo">
                <div className="userinfo">
                    <img src={ARTICLEINFO?.actor?.profilephoto} alt="" />
                    <div className="name">
                        <span>
                        {ARTICLEINFO?.actor?.PostTitle}
                            <span>
                                Student at University of GGSIPU 
                            </span>
                        </span>
                    </div>
                </div>
                <div className="articlebuttons">
                    <button>
                        <img src="/images/book.png" alt="" />
                    </button>
                    <button style={{padding: '8px'}}>
                        <img style={{width: '14px', height: '14px'}} src="/images/save-icon.png" alt="" />
                    </button>
                </div>
            </div>
            <div className="timestamp">
                <span>
                {monthlist[new Date(ARTICLEINFO?.actor?.Date?.seconds *1000).getMonth()]} {new Date(ARTICLEINFO?.actor?.Date?.seconds *1000).getDay()} , {new Date(ARTICLEINFO?.actor?.Date?.seconds *1000).getUTCFullYear()}
                </span>
            </div> 

            <div className="articlepara">
                {reactElement}
                {/* {extractContent(ARTICLEINFO?.Article?.Paragraph)} */}
            </div>

        </div>

        <div className="staticsbox">
            <span>Comments</span>
            <SocialCounts>
                  <li>
                    <button>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA60lEQVR4nO3UMQrCQBBA0djY6BWsBUEhmfSW4glsPIzgBVKkmVUsgpWVrRew8wQ2oqJYmJlcwMhG1KgxZGG30oFpUvzHEnYt62fGnZxrIOgEgr1WcKxoB+wR90BwLNcRFGgHQLD3BDjSGm/4pyogrR8A0llffBaXQdDiHr8tLfXU47gESNPXeHKCoZY+IA3e48li2FSPpQL3b/JnZgI56yDvXIy6hQDVeArZGgUg1TADIG8MA+SbA5Au7jiqGwMc5PlHXCfgYtg2Cawy47oAexT1lQB5KxWAvXwYlQB55YshdHAEd77G/2PlzBWecoVLHX+i/gAAAABJRU5ErkJggg=="
                        alt=""
                      />
                      <img src="/images/clapping-reaction.svg" alt="" />
                      <img src="/images/heart-icon.png" alt="" />
                      <span style={{ marginLeft: "4px" }}>
                        {ARTICLEINFO?.Likes ?
                         Object.keys(ARTICLEINFO?.Likes).length - 1
                        :
                        null}
                      </span>
                    </button>
                  </li>

                    <li>    
                        <a>
                         • {ARTICLEINFO?.comments ? 
                          Object.keys(ARTICLEINFO?.comments).length - 1
                        : 
                        null} comments
                        </a>      
                    </li>
                </SocialCounts>
            <SocialActions>
                  <div className="userdata">
                    <img className="userimg" src={ARTICLEINFO?.actor?.profilephoto} alt="" />
                    <img className="dropdownimg" src="/images/drop-down-arrow.png" alt="" />
                  </div>
                  <button 
                    onClick={() => {
                      
                      const hasUserid = props.User.uid in ARTICLEINFO?.Likes;
                      console.log(hasUserid);
                      // console.log(article?.Likes);
                      hasUserid
                        ? UnLikePost(ARTICLEINFO?.userid, ARTICLEINFO?.postid, ArticleKey)
                        : LikePost(
                          ARTICLEINFO?.userid,
                          ARTICLEINFO?.postid,
                            "Frontend Developer | Btech 1st Year Student |",
                            ArticleKey
                          );
                    }}
                  >
                    <img
                      src={
                        ARTICLEINFO?.Likes && props.User? 
                        props.User.uid in ARTICLEINFO?.Likes
                          ? "/images/Liked.png"
                          : "/images/like-icon.png"
                        :
                        null
                      }
                      alt=""
                    />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src="/images/comment-icon.png" alt="" />
                    <span>Comment</span>
                  </button>
                  <button>
                    <img src="/images/send-icon.png" alt="" />
                    <span>Send</span>
                  </button>
                </SocialActions>
                <CommentSection>
                      <div className="commentinputandimagebox">

                        <div className="inputbox">
                          <form>
                            <textarea
                              placeholder="Add a comment"
                              value={input}
                              onInput={(e) => {
                                setInput(e.target.value);
                              }}
                              type="text"
                              maxLength={1250}
                            />
                            <EmojiIcon
                              height={275}
                              width={353}
                            >
                                     {emojibox && <EmojiPicker
                                        className="emojipickers"
                                        onEmojiClick={onEmojiClick}
                                      />}
                              <img  onClick={() => emojibox ? setemojibox(false) : setemojibox(true)} src="/images/smile-icon.png" alt="" />
                            </EmojiIcon>
                            <ImageIcon>
                              <img src="/images/comment-image.png" alt="" />
                            </ImageIcon>
                          </form>
                        </div>
                      </div>
                      <div>
                        <button className="postcomment" 
                        style={input ? null : { display: "none" }}
                        onClick={() => {
                          CommentPost(
                            ARTICLEINFO?.userid,
                            ARTICLEINFO?.postid,
                            "Frontend Developer | Btech 1st Year Student |",
                            ArticleKey
                          );
                        }}
                        >
                          <span>Post</span>
                        </button>

                        <CommentsBox> 
                        {ARTICLEINFO?.comments ?
                          Object.values(ARTICLEINFO?.comments).length  > 1 ? 
                          <div className="comment-sort">
                            <span>
                              Most relevant
                              <img src="/images/drop-down-arrow.png" alt="" />
                            </span>
                          </div>
                          :
                          null
                        :
                        null}
                          <div className="commentlists">
                          {
                          ARTICLEINFO.comments ? 
                          Object.values(ARTICLEINFO.comments).map((element , id) => {
                            if(element.comment){

                              return <div Key={id} className="comment">
                              <div className="commentprofilephoto">
                                <a>
                                  <img src={element.userInfo.photoURL} alt="" />
                                </a>
                              </div>
                              <div className="commentdata">
                                <div className="commentheader">
                                <div>
                                  <span>
                                    <h3>{element.userInfo.displayName}</h3>
                                    <span>(He/Him) • 2rd+</span>
                                </span>
                                <span>{element.Description}</span>
                                </div>
                                <span>
                                {
                          (new Date().getFullYear() === new Date(element.timestamp.seconds * 1000).getFullYear() ) ?
                            (new Date().getMonth() === new Date(element.timestamp.seconds * 1000).getMonth()) ? 
                              (new Date().getDate() - new Date(element.timestamp.seconds * 1000).getDate() === 0)?
                                new Date().getHours() - new Date(element.timestamp.seconds * 1000).getHours() === 0 ? (
                                  <>
                                   {new Date().getMinutes() - new Date(element.timestamp.seconds * 1000).getMinutes()}m
                                  </>
                                ) : new Date().getHours() - new Date(element.timestamp.seconds * 1000).getHours() < 0 ? (
                                  <>{new Date().getDate() - new Date(element.timestamp.seconds * 1000).getDate()}d</>
                        ) : (
                          <>{new Date().getHours() - new Date(element.timestamp.seconds * 1000).getHours()}h</>
                        )
                        : (
                          <>{new Date().getDate() - new Date(element.timestamp.seconds * 1000).getDate()}d</>
                        )
                        :
                        <>
                         {new Date(element.timestamp.seconds * 1000).getDate()} {monthlist[new Date(element.timestamp.seconds *1000).getMonth()]}
                        </>
               
                        :
                        <>
                          {new Date(element.timestamp.seconds * 1000).getDate()}  {monthlist[new Date(element.timestamp.seconds *1000).getMonth()] + " , " + new Date(element.timestamp.seconds *1000).getUTCFullYear()}
                        </>
                        }
                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nO3SMQrAIBBE0V95dE3umfUaCYJsEZZUcZNiHtjIH7AQREREfqYAO9ABA7Z5t7pzIzhvpyV0rgeDcbe6cxYMjoTOtWBQEzpX5sjmS+vD53qzExER4TMXBaxSQgA4HO4AAAAASUVORK5CYII="
                                    onClick={()=> {showDeleteBox === "" ? setshowDeleteBox((id)) : setshowDeleteBox("")} }
                                  alt="" />
                                </span>
                               {showDeleteBox === id ? <div className="commentfunctionbtns">
                                  <span>
                                    <img src="/images/link.png" alt="" />
                                    Copy link to comment
                                  </span>
                                  {element.commenterid === props.User.uid ? 
                                  <span>
                                    <img src="/images/edit.png" alt="" />
                                    Edit
                                  </span>
                                :
                                <span>
                                  <img src="/images/report.png" alt="" />
                                  Report
                                </span>  
                                }
                                  {element.commenterid === props.User.uid ? 
                                  <span onClick={()=>{
                                    removeComment(ARTICLEINFO?.userid, ARTICLEINFO?.postid, element.commentid, ArticleKey)                    
                                  }}>
                                  
                                    <img src="/images/bin.png" alt="" />
                                    Delete
                                  </span>
                              :
                              <span>
                                <img src="/images/hidden.png" alt="" />
                                I don't want to see this
                              </span>  
                            }
                                </div>
                                :
                                null}
                                </div>
                                <div className="comment_message">
                                  <span>{element.comment.length > 227 ? 
                                  <>
                                    {element.comment.slice(0,227).trim()}
                                    <button> ...more</button>
                                  </>
                                    : element.comment}
                                  </span>
                                </div>                              
                              </div>
                            </div>
                        
                        }
                            else{
                              return;
                            }
                           })
                           :
                           null}
                          </div>
                        </CommentsBox>
                      </div>
                      {/* </CommentInput> */}
                    </CommentSection>
        </div>
    </Container>

    <FollowSection>

    <div className="userposter">
              <div></div>
              <img src={ARTICLEINFO?.actor?.profilephoto} alt="" />
              <div></div>
    </div>
    
    <div className="postername">
        <span>{ARTICLEINFO?.actor?.PostTitle}</span>
    </div>
    <div className="posterdescription">
        <span>Frontend Developer | Btech 2st Year Student |</span>
    </div>

    <button>
        <span>
            <img src="/images/check.png" alt="" /> Following
        </span>
    </button>
    </FollowSection>

    <div style={{position: "fixed", bottom: "0", right: "22px", 
      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
    }} className="homechat">
        <FloatingChatbar/>
      </div>

    </>
    : 
    <div style={{margin: "80px auto"}}>
        ...Loading Article
    </div>
  )
}



const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 70px 122px 0px 102px;

  .article{
    width: 632px;

    .titleimg{
        img{
            height: 309.83px;
            width: 632px;
        }
    }
    
    .Title{
        width: 584px;
        margin:16px 24px;
        span{
            font-weight: 600;
            font-size: 32px;
            line-height: 38px;
            color: rgba(0,0,0,0.9);
        }
    }

    .articlepara{
        *{
            margin:16px 24px;
        }

        p{
            font-size: 16px;
            line-height: 24px;
            color: rgba(0,0,0,0.9);
            font-weight: 400;
          
          strong{
            margin: 0;
          }
          em{
            margin: 0;
          }
        }

        h3{
            font-weight: 600;
            font-size: 20px;
            line-height: 25px;
            color: rgba(0,0,0,0.9);
        }

        pre{
            background-color: rgba(0,0,0,0.6);
            padding: 8px ;
            color: white;
        }
    }

    .articleposterinfo{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 584px;
        margin:16px 24px;
        .userinfo{
            display: flex;
            align-items: center;
            img{
                width: 48px;
                height: 48px;
                cursor: pointer;
                border-radius: 50%;
            }
            .name{
                margin-left: 8px;
                margin-bottom: 4px;
                span{
                    display: flex;
                    flex-direction: column;
                    font-size: 16px;
                    line-height: 20px;
                    font-weight: 600;
                    color: rgba(0,0,0,0.9);
                    cursor: pointer;
                    span{
                        font-size: 14px;
                    line-height: 18px;
                    font-weight: 400;
                    color: rgba(0,0,0,0.6);
                    }
                }
            }   
        }

        .articlebuttons{
                display: flex;
                align-items: center;
                & > button{
                padding: 6px;
                border: 2px solid rgba(0,0,0,0.4);
                    border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                cursor: pointer;
                outline: none;
                margin-left: 12px;
                background-color: transparent ;
                &:hover{
                    border: 2px solid rgba(0,0,0,0.9) ;
                    background-color: rgba(0,0,0,0.05);
                }
                img{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }


    .timestamp{
        margin:16px 24px;
        font-size: 14px;
                    line-height: 21px;
                    font-weight: 400;
                    color: rgba(0,0,0,0.6);
    }
}

.staticsbox{
    position: sticky;
    top: 70px;
    width: 392px;
    padding: 16px;
    background-color: #F8FAFD;
    /* min-height: 308.9px; */
    height: fit-content;

    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        color: rgba(0,0,0,0.9);
        margin-bottom: 16px;
    }
}


    `;


const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: left;
  overflow: hidden;
  /* margin: 0 16px; */
  padding: 8px 0;
  /* border-bottom: 1px solid #e9e5df; */
  list-style: none;
  align-items: center;
  /* justify-content: space-between; */
  li {
    margin-right: 5px;
    font-size: 12px;
    span {
      font-size: 12px !important;
      line-height: 16px;
      font-weight: 300 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0 0 4px !important;
    }
    a{
        font-size: 12px !important;
      line-height: 16px;
      font-weight: 300 !important;
    }

    &:hover {
      span {
        color: blue;
      }
    }
    button {
      display: flex;
      border: none;
      align-items: center;
      background: transparent;  

      img {
        height: 12px;
        width: 12px;
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  /* justify-content: flex-start; */
  /* flex-grow: 1; */
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  justify-content: space-between;

  .userdata{
    display: flex;
    align-items: center;
    padding: 8px;
    .userimg{
        width: 24px;
        height: 24px;
        border-radius: 50%;
    }

    .dropdownimg{
        width: 10px;
        height: 8px;
        margin-left: 6px;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #181818;
    /* flex-grow: 1; */
    background: transparent;
    border: none;
    justify-content: center;
    span{
        margin: 0 !important;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    img {
      width: 21px;
      height: 21px;
    }

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const CommentSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  padding: 4px 0 8px 0px;
  height: unset;

  .commentinputandimagebox {
    display: flex;
  }

  .inputbox {
    /* border: 1px solid black; */
    /* outline: 1px rgba(0,0,0,0.25); */
    min-height: 30px;
    height: unset;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* max-width: 600px; */
    width: 400px;
    border-radius: 40px;
    

    form {
      display: flex;
      max-height: 400px;
      flex-direction: row;
      height: fit-content;
      width: 390px;
      padding: 6px 9.5px;
      border-radius: 40px;
      /* border: none; */
      line-height: 21px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.9);
      flex: 0.85;
      border: 1px solid black;

      @media (max-width: 768px) {
        width: 250px;
      }

      textarea {
        width: 310px;
        scrollbar-color: transparent !important;
        height: unset;
        word-break: break-all !important;
        word-wrap: break-word;
        align-content: center;
        /* vertical-align: middle; */
        background-color: transparent;
        resize: none;
        border: none;
        border-radius: 12px;
        field-sizing: content;
        outline: none;
        margin: -1;
    

      }

      /* .comments-function-btn{
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-left: auto;
      } */
    }
  }

  .postcomment {
    span {
        text-align: center;
        width: 34px;
        height: 3px;
    color: white;
    }
    line-height: 16px;
    font-size: 12px;
    margin-top: 10px;
    margin-left: 5px;
    border-radius: 20px;
    padding: 2px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: #0a66c2;
    &:hover {
      background: #004182;
    }
  }

  @media (max-width: 768px) {
    width: 356px;
    & > div {
      width: 260px;

      form {
        flex: 0.7;
      }
    }
  }
`;

const EmojiIcon = styled.div`
  position: relative;
  /* left: -75px; */
  display: flex;
  justify-content: end !important;
  align-items: center;
  flex-direction: column;
  border: none !important;
  img {
    margin: 0;
    width: 24px;
    height: 24px;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    left: 190px;
  }

  /* &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  } */


  
  .emojipickers {
    z-index: 20;
    position: absolute !important;
    width: 320px !important;
    height: 250px !important;
    max-height: calc(50vh - 48px);
    top: 40px;
    right: -40px;
    .epr_-kg0voo {
        display: none;
    }

  }

`;

const ImageIcon = styled(EmojiIcon)`
  /* left: -65px; */
  margin-left: 6px;
  margin-right: 10px;
  filter: opacity(0.5);

  @media (max-width: 768px) {
    left: 220px;
  }
`;

const CommentsBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 768px) {
        width: 350px;
      }
 
    .comment-sort{
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    /* width: 104px; */
    margin: 20px 0 10px 0;
    height: 17px;
    span{
      width: 120px;
      display: flex;
      align-items: center;
      line-height: normal;
      font-size: 13px;
      font-weight: 600;
      color: rgba(0,0,0,0.6);
      img{
        margin-left: 4px;
        width: 10px;
        height: 8px;
      }
    }
  }

  .commentlists{
    display: flex;
    height: unset;
    width: -webkit-fill-available;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 350px;
      }
    .comment{
      display: flex;
      min-height: 80px;
      margin: 8px 0 0 0;
      justify-content: space-between;
      @media (max-width: 768px) {
        width: 326px;
      }

      .commentprofilephoto{
        img{
            width: 40px;
            border-radius: 50%;
            height: 40px;
        }
      }

      .commentdata{
        border-radius: 0 8px 8px 8px;
        margin-right: 8px;
        border: 1px solid transparent;
        /* padding: 4px 0px 12px 12px; */
        background-color: transparent;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 340px;
        .commentheader{
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-direction: row;
          position: relative;

          & > div {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            span{
              display: flex;
              flex-direction: row;
              margin-bottom: 2px;
              h3{
                cursor: pointer;
                line-height: 21px;
                color: rgba(0,0,0,0.9);
                font-size: 14px;
                font-weight: 600;
                &:hover{
                  text-decoration: underline rgb(10, 102, 194);
                  color: rgb(10, 102, 194);
                }
              }
              span{
                margin-left: 6px;
                font-size: 14px;
                color: rgba(0,0,0,0.6);
                line-height: 21px;
                font-weight: 400;
                margin: 0 0 0 4px;
              }
            }
            span{
              font-size: 12px;
              color: rgba(0,0,0,0.6);
              line-height: 16px;
              font-weight: 400;
            }

            @media (max-width: 768px) {
              span{
                h3{
                  font-size: 12px;
                }
                span{
                  font-size: 12px;
                }
              }
              span{
                font-size: 10px;
              }    
            } 
          }
          span{
              display: flex;
              align-items: center;
              justify-content: flex-end;
              font-size: 12px;
              color: rgba(0,0,0,0.6);
              line-height: 16px;
              font-weight: 400;
              img{
                cursor: pointer;
                margin-left: 4px;
                width: 13px;
                height: 8px;
              }
          }

          .commentfunctionbtns{
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            height: 90px;
            padding: 2px 0;
            top: 24px;
            right: 0px;
            margin: 0;
            z-index: 2;
            position: absolute;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgba(0 0 0 /20%);
            span{
              display: flex;
              align-items: center;
              justify-content: flex-start;
              img{
                width: 14px;
                height: 16px;
                padding: 0;
                margin: 0 8px 0 0px;
              }
              width: 175px;
              padding: 5px 12px;
              margin: 0;
              font-weight: 600;
              color: rgba(0,0,0,0.9);
              font-size: 14px;
              line-height: 20px;
              &:hover{
                background-color: rgba(0,0,0,0.06)
              }
            }
          }
        }

        .comment_message{
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: start;
          span{
            text-align: start;
            font-size: 14px;
            line-height: 20px;
            color: rgba(0,0,0,0.9);
            font-weight: 400;

            button{
              border: none;
              outline: none;
              color: rgba(0,0,0,0.6);
              cursor: pointer;
              &:hover{
                text-decoration: underline rgb(10, 102, 194);
                  color: rgb(10, 102, 194);
              }
            }
          }

        }
      }

    }
  }
`;


const FollowSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column ;
    
    .userposter{
        justify-content: center;
        display: flex;
        align-items: center;
        flex-direction: row;
        margin-bottom: 20px;
      & > div{
        height: 1px;
        margin: 0 12px ;
        background-color: rgba(0,0,0,0.2);  
        padding: 0px 180px;
    }
      img{
        width: 72px;
        cursor: pointer;
        height: 72px;
        border-radius: 50%;
      }
    }

    .postername{
        span{
            cursor: pointer;
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
            color: rgba(0,0,0,0.9);
            &:hover{
              text-decoration: underline;
            }
        }
    }

    .posterdescription{
        span{
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            cursor: pointer;
            color: rgba(0,0,0,0.6);
            &:hover{
              text-decoration: underline rgba(0,0,0,0.4); 
            }
        }
    }

    button {
    margin-top: 20px;
    margin-bottom: 40px;
    /* width: 78px; */
    height: 30px;
    font-size: 16px;
    line-height: 20px;
    border-radius: 20px;
    padding: 6px 20px;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    img {
      margin-right: 4px;
      width: 18px;
      height: 18px;
    }
  
    background-color: white;
    border: 1px solid #0a66c2;
    color: #0a66c2;
    width: 116px;


    &:hover {
      background: #ebf4fd;
    }

    span{
        display: flex;
    }
}
`;

const mapStateTOProps = (state) => {
    return {
      User: JSON.parse(localStorage.getItem("User")),
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
  });
  
export default connect(mapStateTOProps, mapDispatchToProps)(ArticlePostPage);
  

import styled from "styled-components";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getAritcleAPI,
  postUserFeedAPI,
  getUserconnectionlistAPI,
  getUserFeedAPI,
  getUserconnectionsPostsAPI,
  setLoading,
} from "../actions";
import ReactPlayer from "react-player";
import EmojiPicker from "emoji-picker-react";
import db from "../firebase";
import { ref as dbRef } from "firebase/database";
import { set } from "firebase/database";
import { remove } from "firebase/database";
import "../Main.css";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const Main = (props) => {
  
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState("close");
  // const [Liked, setLiked] = useState("unlike");
  const monthlist = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  // const [UserFeed, setUserFeed] = useState([]);
  const [commentBox, setcommentBox] = useState(false);
  const [showDeleteBox, setshowDeleteBox] = useState("");
  const [showPostDeleteBox, setshowPostDeleteBox] = useState("");
  const [input, setInput] = useState("");
  const [emojibox, setemojibox] = useState("");
  const id = (Math.floor(Math.random() * 5000))

  const onEmojiClick = (event) => {
    setInput((prevInput) => prevInput + event.emoji);
    // console.log(input, "emoji ");
  };

  useEffect(() => {
    const payload = {
      user: props.User,
      Userconnections: props.Userconnectionslist,
      // UserFeed: props.articles?.concat(props.UserconnectionsPosts),
    };
    if (!props.User) return;
    // debugger;
    props.getAritcles(payload);
    props.getUserconnectionlist(payload);
    // props.getUserFeed(payload);
    // console.log(props.articles);
    //   const array  = [];
    // props.Userconnectionslist.map((Data, id)=> {
    //   array.push(Data.ConnectData.connectid);
    //   return;
    // })
    // setconnectionids(array);
  }, [props.user]);

  useEffect(() => {
    const payload = {
      user: props.User,
      Userconnections: props.Userconnectionslist,
    };
    if (props.Userconnectionslist.length) props.getUserconnectionsPost(payload);
  }, [props.Userconnectionslist]);

  // console.log(props.Userconnectionslist, " connectionslist");
  // console.log(connectionids, " connectionsids");

  useEffect(() => {
    const payload = {
      user: props.User,
      Userconnections: props.Userconnectionslist,
      UserFeed:
        props.UserconnectionsPosts &&
        props.UserconnectionsPosts?.concat(props.articles),
    };
    props.postUserFeed(payload);
  }, [props.articles, props.UserconnectionsPosts]);

  useEffect(() => {
    const payload = {
      user: props.User,
      Userconnections: props.Userconnectionslist,
      // UserFeed: props.articles?.concat(props.UserconnectionsPosts),
    };

    props.getUserFeed(payload);
  }, []);

  // useEffect(()=> {
  //   if(props.UserconnectionsPosts.length || props.articles){
  //     setUserFeed(props.articles.concat(props.UserconnectionsPosts));
  //   }
  //   console.log(UserFeed, "feed 1");
  // },[props.Userconnectionslist]);

  // useEffect(()=> {
  // //   if(UserFeed.length){
  // //     set(dbRef(db, `Users/${props.User.uid}/UserFeed/`), {
  // //       Posts: payload.UserFeed,
  // //   })
  // //   console.log(props.UserFinalFeed, " final feed");
  //   props.postUserFeed(payload)
  //   // setUserFeed([]);

  // },[UserFeed]);



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
        `Users/${userid}/UserPost/${postid}/Likes/${props.User.uid}/`
      )
    );
    remove(
      dbRef(
        db,
        `Users/${props.User.uid}/UserFeed/Posts/${key}/Likes/${props.User.uid}/`
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
    setemojibox("");
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

  const removePost = (key, userid, postid) => {
    remove(
      dbRef(
        db,
        `Users/${props.User.uid}/UserFeed/Posts/${key}/`
      )
    );
    remove(
      dbRef(
        db,
        `Users/${userid}/UserPost/${postid}/`
      )
    );

    setshowPostDeleteBox("");
  }


  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
    }
  };
  // console.log(props.articles);
  return (
    <>
      <Container>
        <ShareBox>
          <div>
            {props.User && props.User.photoURL ? (
              <img src={props.User.photoURL} alt="" />
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <button
              onClick={handleClick}
              disabled={props.loading ? true : false}
            >
              Start a post, try writing with AI
            </button>
          </div>
          <div>
            <button>
              <img src="/images/share-image-icon.png" alt="" />
              <span>Media</span>
            </button>

            <button>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJ0lEQVR4nO1YXUoDMRDOJRQRq2Ta24h4Fzdp8QCC51DQG+iTWCw+WDOl6oNXUN9EX3xaSXeLtd3dznb7M92dD4ZCMk1mvky+JKuUQJAJZ/Q9WggTzUBHlT0+TBs8trlkwTk+TBmIGwHUdn4TFIQQYKUCQtkCVjQgpGoDP5EpCNEAO+cF6pn6oTPQdha+sy4U0y4gy7as+KJc9C0G+iAzeWf0adoET83GztCve1SvrTrhmeMzcJK68ujZMvoHDTTR1rYHpFg4j1jUV34SP7iz+jryhTO1YlDi87mghdYgN98ewP7kQAbaMUut/+2NurP6PYHJt36wq9WKkSc+n1vUr28SBtJfUWe08gmTXDqjP2K78G2KCajxxZXgCfhUXI+1RSM1T2QgZMs0IWAcKFsARAMwRQQzv7slfH/j5k+qdMyogLzCws1/bgSoFKQFyMWf1IdCAEgFoGwBEA1QOUWlUiKIlT0GDXSmTmjgjqt/YQLKBCHAzlABjtndXt4CVt4C4UqOQUWckJs/qQ+FAJAKQNkCIBqgMoSjuseg4XW3l7dAAchbwJbgLVAEhS5CyFDUlkqAIg66aP8iEAJsySvAUfSkzAQgIXlnoVt6AtQIeseNDTTwHPe9Ppi9rcoQ0KMkTyVgUcdaXv8sjPqSk59KAOO7/USssX+u5D3ysMwZf6Tpl+FvP4BN8h/VmmOscqavfN59uEZGT568D9fEnNGPpLIXCASq6vgFcvzI1mN04DUAAAAASUVORK5CYII="
                alt=""
              />
              <span>Event</span>
            </button>

            <button onClick={() => navigate("/article")}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACd0lEQVR4nO3az2vUUBAH8HhQUA/iQVAQlZ0JYkE99D/QqplJ/YlFPPunVAt6USuCYK+e9daq4O5MwNMiKurVowdPFn9rXXndpK5x07rZvJeE7hdC2E1I3ufNJCTLel4qytgpfCF40+S9Oz2XURuQMjBqASGML1bWAe6oLSQK92wXwrbTyqgFiDmuc4xagjjHqEWIU4xahjjDqAOIE4w6gljHqEOIVYw6hljDaAkQKxgtCVI4RkuEmJhnMWV8mTybeVWCuJqEv1L2wHUESWVdVMSzlBFktZTdSjq62FMpuwK6niryeKKx7eGxQ1tzQ3LPzhCT5/XuRzgpDK/N90K4JITNKPQP1woijJeE8Vd6uxAsaoBjtWgtDfC8MvzI3I/wQeUh2oMQwlllePtPVRg+VB/CcSUIps34mif270tjagLBFUSSNEYY7+e68IrOIIgkynir226w2GL/QLUhlImYSdquFcKpwQ7qeBGGq33HRzDdReJPZf/i4LNTAYQQXo63f2+xfy5fmctGMF5JEFHYOLsqomyIZLVTfE0IwTclOLMmYi3Ifx0g58QUiigL0g/R8bwNSnA9QQjD6cJPbLudOgbBcCNBZN5iqwLJQgjBzaEQLiHZCJxNEFGAJ3MhHEJm+iPgdrz9izIEuRGuIEI4/3Rq9+ZeRPLspAxfzZvgUAg3EPgYrx+1J3dtie9Od2LgZwnw+NAI6xCC9y1qHFTCd93P+EQZ7yaIKPQnCkFYhzDcM+cwPxj8qcwy4pMGjaOFIaxDCBdMS5nZ70UINY54Vc+rqbFNvQOPB7+kDM+U4JppNa8OaY+PbxSC58uvpgRzQnDBxl+dfgPFvxR6t5PvNwAAAABJRU5ErkJggg=="
                alt=""
              />
              <span>Write article</span>
            </button>
          </div>
        </ShareBox>
        <Content>
          {props.loading && <img src="/images/spinner.svg" alt="" />}
          {props.UserFinalFeed.length > 0 &&
            props.UserFinalFeed.map((article, Key) => (
              <Article key={Key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.profilephoto} alt="" />
                    <div>
                      <span>{article.actor.PostTitle}</span>
                      <span>{article.actor.description}</span>
                      <span>
                        {
                          (new Date().getFullYear() === new Date(article.actor.Date.seconds * 1000).getFullYear() ) ?
                            (new Date().getMonth() === new Date(article.actor.Date.seconds * 1000).getMonth()) ? 
                              (new Date().getDate() - new Date(article.actor.Date.seconds * 1000).getDate() === 0)?
                                new Date().getHours() - new Date(article.actor.Date.seconds * 1000).getHours() === 0 ? (
                                  "few minutes ago"
                                ) : new Date().getHours() - new Date(article.actor.Date.seconds * 1000).getHours() < 0 ? (
                                  <>{new Date().getDate() - new Date(article.actor.Date.seconds * 1000).getDate()}d</>
                        ) : (
                          <>{new Date().getHours() - new Date(article.actor.Date.seconds * 1000).getHours()}h</>
                        )
                        : (
                          <>{new Date().getDate() - new Date(article.actor.Date.seconds * 1000).getDate()}d</>
                        )
                        :
                        <>
                          {new Date(article.actor.Date.seconds * 1000).getDate()} {monthlist[new Date(article.actor.Date.seconds *1000).getMonth()] + " , " + new Date(article.actor.Date.seconds *1000).getUTCFullYear()}
                        </>
               
                        :
                        <>
                           {new Date(article.actor.Date.seconds * 1000).getDate()} {monthlist[new Date(article.actor.Date.seconds *1000).getMonth()] + " , " + new Date(article.actor.Date.seconds *1000).getUTCFullYear()}
                        </>
                        }
                      </span>
                    </div>
                  </a>
                  <button onClick={() => showPostDeleteBox === "" ? setshowPostDeleteBox(Key) : setshowPostDeleteBox("")} >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nO3SMQrAIBBE0V95dE3umfUaCYJsEZZUcZNiHtjIH7AQREREfqYAO9ABA7Z5t7pzIzhvpyV0rgeDcbe6cxYMjoTOtWBQEzpX5sjmS+vD53qzExER4TMXBaxSQgA4HO4AAAAASUVORK5CYII="
                      alt=""
                    />
                  </button>
                  <button>
                    <img src="/images/cross-icon.png" alt="" />
                  </button>
                  {showPostDeleteBox === Key && <div className="postfuntionbtns">
                                  <span>
                                    <img src="/images/save-icon.png" alt="" />
                                    Save
                                  </span>                    
                                  <span>
                                    <img src="/images/link.png" alt="" />
                                    Copy link to post
                                  </span>                    
                                  <span>
                                    <img src="/images/hidden.png" alt="" />
                                    Not intrested
                                  </span>  
                                  {props.User.uid === article.userid ?
                                  <span onClick={() => removePost(Key, article.userid, article.postid) }>
                                    <img src="/images/bin.png" alt="" />
                                    Delete post
                                  </span>                            
                                  :
                                  <span>
                                    <img src="/images/embend-icon.png" alt="" />
                                    Embed this post
                                  </span>  
                                }                          
                                  <span>
                                    <img src="/images/report.png" alt="" />
                                    Report post
                                  </span>                            
                    </div> }
                </SharedActor>
                <Description>{article.description}</Description>
                <SharedImg>
                  <a>
                    {article.Article && article.Article.TitleImage ? (
                      // <ReactPlayer
                      //   controls={true}
                      //   muted={true}
                      //   width={"100%"}
                      //   url={article.video}
                      // />
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "rgba(0,0,0,0.9)",
                        }}
                        to={`/pulse/${article.Article.Title}/${article.actor.PostTitle}/${article.userid}/${article.postid}/${Key}`}
                      >
                        <div className="articlebox">
                          <p>
                            <img src={article.Article.TitleImage} alt="" />
                            <span>{article.Article.Title}</span>
                          </p>
                        </div>
                      </Link>
                    ) : article.PhotoImage === "" ? (
                      <></>
                    ) : (
                      article.PhotoImage && (
                        <img src={article.PhotoImage} alt="" />
                      )
                    )}
                  </a>
                </SharedImg>
                <SocialCounts>
                  <li>
                    <button onClick={handleClick}>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA60lEQVR4nO3UMQrCQBBA0djY6BWsBUEhmfSW4glsPIzgBVKkmVUsgpWVrRew8wQ2oqJYmJlcwMhG1KgxZGG30oFpUvzHEnYt62fGnZxrIOgEgr1WcKxoB+wR90BwLNcRFGgHQLD3BDjSGm/4pyogrR8A0llffBaXQdDiHr8tLfXU47gESNPXeHKCoZY+IA3e48li2FSPpQL3b/JnZgI56yDvXIy6hQDVeArZGgUg1TADIG8MA+SbA5Au7jiqGwMc5PlHXCfgYtg2Cawy47oAexT1lQB5KxWAvXwYlQB55YshdHAEd77G/2PlzBWecoVLHX+i/gAAAABJRU5ErkJggg=="
                        alt=""
                      />
                      <img src="/images/clapping-reaction.svg" alt="" />
                      <img src="/images/heart-icon.png" alt="" />
                      <span style={{ marginLeft: "4px" }}>
                        {Object.keys(article.Likes).length - 1}
                      </span>
                    </button>
                  </li>
                  <div style={{ display: "flex", gap: "18px" }}>
                    <li>
                      <a>{Object.keys(article.comments).length - 1} comments</a>
                    </li>
                    <li>
                      <a>
                        <ul>
                          <li>16 repost</li>
                        </ul>
                      </a>
                    </li>
                  </div>
                </SocialCounts>
                <SocialActions>
                  <button
                    onClick={() => {
                      const hasUserid = props.User.uid in article.Likes;

                      // console.log(article?.Likes);
                      hasUserid
                        ? UnLikePost(article.userid, article.postid, Key)
                        : LikePost(
                            article.userid,
                            article.postid,
                            "Frontend Developer | Btech 1st Year Student |",
                            Key
                          );
                    }}
                  >
                    <img
                      src={
                        props.User.uid in article.Likes
                          ? "/images/Liked.png"
                          : "/images/like-icon.png"
                      }
                      alt=""
                    />
                    {/* <img src="/images/like-icon.png" alt="" /> */}
                    <span>Like</span>
                  </button>
                  <button
                    onClick={() =>
                      setcommentBox(true)
                      // commentBox ? setcommentBox(false) : setcommentBox(true)
                    }
                  >
                    <img src="/images/comment-icon.png" alt="" />
                    <span>Comment</span>
                  </button>
                  <button>
                    <img src="/images/reshare-icon.png" alt="" />
                    <span>Repost</span>
                  </button>
                  <button>
                    <img src="/images/send-icon.png" alt="" />
                    <span>Send</span>
                  </button>
                </SocialActions>
                {commentBox ? (
                  <>
                    
                    <CommentSection>
                      <div className="commentinputandimagebox">
                        <a>
                          <img src={props.User.photoURL} alt="" />
                        </a>
                        {/* <CommentInput> */}
                        <div className="inputbox">
                          <form>
                            <textarea
                              value={input}
                              onInput={(e) => {
                                setInput(e.target.value);
                              }}
                              placeholder="Add a comment"
                              type="text"
                              maxLength={1250}
                            />
                            <EmojiIcon
                              // onClick={(e) => {
                              //   // console.log(e, Key);
                              //   emojibox === Key
                              //     ? setemojibox("")
                              //     : setemojibox(Key);
                              // }}
                              height={275}
                              width={353}
                            >

                      {emojibox === Key ? (
                      <EmojiPicker
                        className="emojipickers"
                        onEmojiClick={onEmojiClick}
                      />
                    ) : null}
                              <img onClick={(e) => {
                                // console.log(e, Key);
                                emojibox === Key
                                  ? setemojibox("")
                                  : setemojibox(Key);
                              }} src="/images/smile-icon.png" alt="" />
                            </EmojiIcon>
                            <ImageIcon>
                              <img src="/images/comment-image.png" alt="" />
                            </ImageIcon>
                          </form>
                        </div>
                      </div>
                      <div>
                        <button
                          style={input ? null : { display: "none" }}
                          onClick={() => {
                            CommentPost(
                              article.userid,
                              article.postid,
                              "Frontend Developer | Btech 1st Year Student |",
                              Key
                            );
                            // console.log(article.comments, " comments");
                            // Object.values(article.comments).forEach(
                              // (element) => {
                                // console.log(element.userInfo.displayName);
                              // }
                            // );
                          }}
                          className="postcomment"
                        >
                          <span>Post</span>
                        </button>

                        <CommentsBox> 
                          {Object.values(article.comments).length  > 1 ? 
                          <div className="comment-sort">
                            <span>
                              Most relevant
                              <img src="/images/drop-down-arrow.png" alt="" />
                            </span>
                          </div>
                          :
                          null}
                          <div className="commentlists">
                          {Object.values(article.comments).map((element , id) => {
                            if(element.comment){

                              return (
                              <>
                              <div Key={id} className="comment">
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
                          {new Date(element.timestamp.seconds * 1000).getDate()} {monthlist[new Date(element.timestamp.seconds *1000).getMonth()] }
                        </>
               
                        :
                        <>
                          {new Date(element.timestamp.seconds * 1000).getDate()}  {monthlist[new Date(element.timestamp.seconds *1000).getMonth()] + " , " + new Date(element.timestamp.seconds *1000).getUTCFullYear().toString().slice(2,4)}
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
                                    removeComment(article?.userid, article.postid, element.commentid, Key)                    
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
                                : null}
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
                            <div className="like_replies">
                                    <button>
                                      Like
                                    </button>
                                    <span> | </span>
                                    <button>
                                      Reply
                                    </button>
                                    <span>• 0 Replies</span>
                            </div>
                            </>
                          )}
                            else{
                              return;
                            }
                           })}
                          </div>
                        </CommentsBox>
                      </div>
                      {/* </CommentInput> */}
                    </CommentSection>

                  </>
                ) : null}
              </Article>
            ))}
        </Content>

        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 8px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgba(0 0 0 /15%), 0 0 0 rgb(0 0 0/20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgb(0, 0, 0, 0.75);
      font-size: 14px;
      line-height: 28px;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      font-weight: 600;

      button {
        padding: 0 8px;
        img {
          margin: 0 4px 0 -2px;
          width: 22px;
          height: 22px;
        }
        span {
          color: rgba(0, 0, 0, 0.65);
        }
        &:hover {
          cursor: pointer;
          background: rgba(0, 0, 0, 0.05);
          color: rgba(0, 0, 0, 0.75);
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;


`;

const SharedActor = styled.div`
  padding-right: 40px;
  position: relative;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;

        &:first-child {
          font-size: 14px !important;
          font-weight: 700 !important;
          color: rgba(0, 0, 0, 1) !important;
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    outline: none;
    background: transparent;
    border: none;

    img {
      cursor: pointer;
      width: 16px;
      height: 16px;
    }

    &:first-child {
      position: absolute;
      right: 12px;
      top: 0;
    }
  }

  .postfuntionbtns{
    display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: column;
            height: unset;
            /* padding: 8px 16px; */
            margin: 0;
            position: absolute;
            background-color: #fff;
            width: 355px;
            top: 55px;
    z-index: 2;
    right: 45px;
            border-radius: 8px;
            box-shadow: 0 0 0 1px rgb(0 0 0 /15%), 0 0 0 rgba(0 0 0 /20%);
            span{
              display: flex;
              width: 322px;
              align-items: center;
              height: 56px;
              justify-content: flex-start;
              img{
                width: 20px;
                height: 20px;
                padding: 0;
                margin: 0 12px 0 0px;
              }
              padding: 0px 16px;
              margin: 0;
              font-weight: 600;
              color: rgba(0,0,0,0.8);
              font-size: 15px;
              line-height: 24px;
              &:hover{
                color: rgba(0,0,0,0.9);
                background-color: rgba(0,0,0,0.06)
              }
            }
          }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .articlebox {
    cursor: pointer;
    p {
      width: 100%;
      background-color: #edf3f8;
      padding: 0 0 8px 0;
      border-radius: 0 0 8px 8px;
      span {
        display: flex;

        width: 100%;
        margin-left: 8px;
        margin-top: 8px;
        line-height: 20px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: left;
  overflow: hidden;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  align-items: center;
  justify-content: space-between;

  li {
    margin-right: 5px;
    font-size: 12px;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2px;
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
        height: 16px;
        width: 16px;
      }
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #181818;
    flex-grow: 1;
    background: transparent;
    border: none;
    justify-content: center;
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

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
    height: 30px;
  }
`;

const CommentSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;

  img {
    border-radius: 50px;
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
  display: flex;
  width: 100%;
  padding: 4px 16px 8px 16px;
  height: unset;

  .commentinputandimagebox {
    display: flex;
  }

  .inputbox {
    /* border: 1px solid black; */
    /* outline: 1px rgba(0,0,0,0.25); */
    min-height: 40px;
    height: unset;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* max-width: 600px; */
    width: 450px;
    border-radius: 40px;
    

    form {
      display: flex;
      max-height: 400px;
      flex-direction: row;
      height: fit-content;
      width: 414px;
      padding: 9.5px;
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
        width: 345px;
        scrollbar-color: transparent !important;
        height: unset;
        word-break: break-all !important;
        word-wrap: break-word;
        align-content: center;
        /* vertical-align: middle; */
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
      width: 27px;
      height: 20px;
    }
    line-height: 20px;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 65px;
    border-radius: 20px;
    padding: 2px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: #0a66c2;
    color: white;
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

  .emojipickers {
    bottom: 38px;
    z-index: 20;
    position: absolute !important;
    right: -208px;
    max-height: calc(50vh - 48px);
    .epr_-kg0voo {
        display: none;
    }

    @media (max-width: 768px) {
          bottom: 230px;
          left: 12px;
      }
  }

  @media (max-width: 768px) {
    left: 190px;
  }

  /* &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  } */
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
  width: 500px;
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
    margin-bottom: 8px;
    @media (max-width: 768px) {
        width: 350px;
      }
    .comment{
      display: flex;
      min-height: 80px;
      margin: 20px 0 6px 0;
      position: relative;
      @media (max-width: 768px) {
        width: 326px;
      }

      .commentdata{
        border-radius: 0 8px 8px 8px;
        border: 1px solid transparent;
        padding: 4px 0px 12px 12px;
        background-color: #F2F2F2;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 500px;
        .commentheader{
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-direction: row;

          & > div {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            span{
              display: flex;
              flex-direction: row;
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
            right: 10px;
            margin: 0;
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

    .like_replies{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left:  52px;
      margin-bottom: 5px;
      & > button {
        font-size: 12px;
        line-height: 16px;
        color: rgba(0,0,0,0.6);
        font-weight: 600;
        border: none;
        cursor: pointer;
        outline: none;
        background: transparent;
        &:hover{
          color: rgba(0,0,0,0.9);
          background-color: rgba(0,0,0,0.05);
        }
      }

      span{
        font-size: 12px;
        line-height: 10px;
        color: rgba(0,0,0,0.6);
        font-weight: 400;
      }
    }
  }
`;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem("User")),
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
    Userconnectionslist: state.articleState.Userconnectionslist,
    UserconnectionsPosts: state.articleState.UserconnectionsPosts,
    UserFinalFeed: state.articleState.UserFinalFeed,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAritcles: (payload) => dispatch(getAritcleAPI(payload)),
  getUserconnectionlist: (payload) =>
    dispatch(getUserconnectionlistAPI(payload)),
  getUserconnectionsPost: (payload) =>
    dispatch(getUserconnectionsPostsAPI(payload)),
  getUserFeed: (payload) => dispatch(getUserFeedAPI(payload)),
  postUserFeed: (payload) => dispatch(postUserFeedAPI(payload)),
});

export default connect(mapStateTOProps, mapDispatchToProps)(Main);

import styled from "styled-components";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getAritcleAPI } from "../actions";
import ReactPlayer from "react-player";
import EmojiPicker from 'emoji-picker-react';
import "../Main.css";
import { Link, useNavigate } from "react-router-dom";

const Main = (props) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState("close");
  const [commentBox, setcommentBox] = useState(false);
  const [input, setInput] = useState("");
  const [emojibox, setemojibox] = useState(false)

  const onEmojiClick = (event) => {
    setInput(prevInput => prevInput + event.emoji);
    // console.log(input, "emoji ");
  }

  const payload = {
     user: props.User,
  };


  
  useEffect(() => {
    props.getAritcles(payload);
    // console.log(props.articles);
  }, [props.user]);

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

            <button onClick={() => navigate("/article") }>
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
          {props.articles.length > 0 &&
            props.articles.map((article, Key) => (
              <Article key={Key}>
                <SharedActor>
                  <a>
                    <img src={article.actor.profilephoto} alt="" />
                    <div>
                      <span>{article.actor.PostTitle}</span>
                      <span>{article.actor.description}</span>
                      <span>{article.actor.Date}</span>
                    </div>
                  </a>
                  <button>
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nO3SMQrAIBBE0V95dE3umfUaCYJsEZZUcZNiHtjIH7AQREREfqYAO9ABA7Z5t7pzIzhvpyV0rgeDcbe6cxYMjoTOtWBQEzpX5sjmS+vD53qzExER4TMXBaxSQgA4HO4AAAAASUVORK5CYII="
                      alt=""
                    />
                  </button>
                  <button>
                    <img src="/images/cross-icon.png" alt="" />
                  </button>
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
                      <Link style={{textDecoration: "none", color: "rgba(0,0,0,0.9)"}} to={`/pulse/${article.Article.Title}/${props.User.displayName}-${props.User.uid}/`}>
                      <div className="articlebox">
                      <p>
                        <img src={article.Article.TitleImage} alt="" />
                      <span>{article.Article.Title}</span>
                      </p>
                      </div>
                      </Link>
                    ) : (
                      article.PhotoImage && (
                        <img src={article.PhotoImage} alt="" />
                      )
                    )}
                  </a>
                </SharedImg>
                <SocialCounts>
                  <li>
                    <button>
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA60lEQVR4nO3UMQrCQBBA0djY6BWsBUEhmfSW4glsPIzgBVKkmVUsgpWVrRew8wQ2oqJYmJlcwMhG1KgxZGG30oFpUvzHEnYt62fGnZxrIOgEgr1WcKxoB+wR90BwLNcRFGgHQLD3BDjSGm/4pyogrR8A0llffBaXQdDiHr8tLfXU47gESNPXeHKCoZY+IA3e48li2FSPpQL3b/JnZgI56yDvXIy6hQDVeArZGgUg1TADIG8MA+SbA5Au7jiqGwMc5PlHXCfgYtg2Cawy47oAexT1lQB5KxWAvXwYlQB55YshdHAEd77G/2PlzBWecoVLHX+i/gAAAABJRU5ErkJggg=="
                        alt=""
                      />
                      <img src="/images/clapping-reaction.svg" alt="" />
                      <img src="/images/heart-icon.png" alt="" />
                      <span>600</span>
                    </button>
                  </li>
                  <div style={{ display: "flex", gap: "18px" }}>
                    <li>
                      <a>{article.comments} comments</a>
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
                  <button>
                    <img src="/images/like-icon.png" alt="" />
                    <span>Like</span>
                  </button>
                  <button onClick={() => commentBox ? setcommentBox(false) : setcommentBox(true) }>
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
                {commentBox ? 
                <>
                {emojibox ?
                <EmojiPicker  className="emojipicker" onEmojiClick={onEmojiClick} />
                :
                null
                }
                <CommentSection>
                  <a>
                    <img src={props.User.photoURL} alt="" />
                  </a>
                  {/* <CommentInput> */}
                  <div>
                    <form>
                      <textarea value={input}
                        onInput={(e) => {setInput(e.target.value);}} 
                        placeholder="Add a comment" type='text' />
                    </form>
                    
                    <EmojiIcon onClick={() => {emojibox ? setemojibox(false) : setemojibox(true)}} height={275} width={353}>
                      <img src="/images/smile-icon.png" alt="" />
                    </EmojiIcon>
                    <ImageIcon>
                    <img src="/images/comment-image.png" alt="" />
                    </ImageIcon>
                  </div>

                  {/* </CommentInput> */}
                </CommentSection>
              </>
              : null}
              </Article>
            ))}
        </Content>

        <PostModal  showModal={showModal} handleClick={handleClick} />
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


  .articlebox{
    cursor: pointer;
    p{
      width: 100%;
      background-color: #edf3f8;
      padding: 0 0 8px 0 ;
      border-radius: 0 0 8px 8px;
      span{
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
  & > div{
    border: 1px solid black;
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


    form{
      display: flex;
      max-height: 400px;
      flex-direction: column;
      height: fit-content;
      width: 400px;
      padding: 0 9.5px;
      border-radius: 40px;
      border: none;
      line-height: 21px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.9);
      flex: 0.85;
      textarea{
        scrollbar-color: transparent !important;
        height: inset;
        word-break: break-all !important;
        word-wrap: break-word;
        align-content: center;
        vertical-align: middle;
        resize: none;
        border: none;
        outline: none;
      }
    }
  }

  @media(max-width:768px){
    & > div{
      width: 260px;

      form{
        flex: 0.70;
      }
    }
  }
`;

const EmojiIcon = styled.div`
  position: absolute;
  left: 380px;
  display: flex;
  justify-content: center !important;
  align-items: center;
  flex-direction: column;
  border: none !important;
  img {
          width: 24px;
          height: 24px;
          border: none;
          cursor: pointer; 
  }

  @media(max-width:768px){
    left: 190px;
  }

  /* &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  } */
`;

const ImageIcon = styled(EmojiIcon)`
  left: 410px;
  filter: opacity(0.5);

    @media(max-width:768px){
    left: 220px;
  }
`;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem('User')),
    // user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAritcles: (payload) => dispatch(getAritcleAPI(payload)),
});

export default connect(mapStateTOProps, mapDispatchToProps)(Main);

import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { PostAPI } from "../actions";
import { PostArticleAPI } from "../actions";
import EmojiPicker from "emoji-picker-react";
import { Timestamp } from "firebase/firestore";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setshareImage] = useState("");
  const [videoLink, setvideoLink] = useState("");
  const [assetArea, setassetArea] = useState("");
  const [emojibox, setemojibox] = useState(false)

  const reset = (e) => {
    setEditorText("");
    setshareImage("");
    setvideoLink("");
    setassetArea("");
    props.handleClick(e);
  };

  
  const onEmojiClick = (event) => {
    setEditorText(prevInput => prevInput + event.emoji);
    // console.log(input, "emoji ");
  }

  const handleChange = (e) => {
    const image = e.target.files[0];
    
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }

    setshareImage(image);
  };

  const switchAssetArea = (area) => {
    setshareImage("");
    setvideoLink("");
    setassetArea(area);
  };

  const PostArticle = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget){
        return;
    }

    const payload = {
        user: props.User,
        description : editorText,
        Paragraph: props.TitlePara,
        Title: props.TitleText,
        TitleImage: props.TitleImage,
        timestamp: Timestamp.now(), 
        // timestamp: new Date().getDate(),
        // hours: new Date().getHours()
        // timestamp: new Date().getDate() + " , " + new Date().getMinutes() + ":" + new Date().getSeconds(),

    };

    
    props.PostArticle(payload);
    reset(e);
    props.resetarticle();
  }

  const PostAPI = (e) => {
    e.preventDefault();
    if(e.target !== e.currentTarget){
        return;
    }

    const payload = {
        PhotoImage: shareImage,
        PhotoVideo: "",
        user: props.User,
        description : editorText,
        timestamp: Timestamp.now(),
        // Paragraph: `${props.TitlePara === ""}` ? "" : props.TitlePara,
        // Title:`${props.TitleText === ""}` ? "" : props.TitleText,
        // TitleImage: `${props.TitleImage === ""}` ? "" : URL.createObjectURL(props.TitleImage),
        // timestamp:  new Date().getDate(), //+ "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
        // timestamp: new Date().getDate() + " , " + new Date().getMinutes() + ":" + new Date().getSeconds(),
        // hours: new Date().getHours(),
      };

    

    props.PostAPI(payload);
    reset(e);

    // reset state after posting
  }

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Content>
            <Header>
            <UserInfo>
                {props.User.photoURL? <img src={props.User.photoURL} alt=""/> :
                    <img src="/images/user.svg" alt="" />
                }
                <div>
                <span>
                    {props.User.displayName}
                    <img src="/images/drop-down-arrow.png" alt="" />
                </span>
                <p>Post to Anyone</p>
                </div>
              </UserInfo>
              <button onClick={(event) => reset(event)}>
                <img src="/images/cross-icon.png" alt="" />
              </button>
            </Header>
            <SharedContent>
        
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder={props.assetArea === "Article" ? 
                      "Tell your network what your article is about. Add #hashtags to help people find it." 
                    :
                      "What do you want to talk about?"
                    } 
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      accept="image/gif, image/png, image/jpeg"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor="file">Select an image to share</label>
                      {shareImage && (
                        <img src={URL.createObjectURL(shareImage)} alt="" />
                      )}
                    </p>
                  </UploadImage>
                ) : 
                (props.assetArea === 'Article' &&
                  <>
                    <div className="articlebox">

                    <p>
                      <img width={"100%"} src={URL.createObjectURL(props.TitleImage)} alt="" />
                      <span>{props.TitleText}</span>
                    </p>
                    </div>
                    {/* <input
                      type="text"
                      placeholder="Please put a video link"
                      value={videoLink}
                      onChange={(e) => setvideoLink(e.target.value)}
                    />
                    {videoLink && (
                      <ReactPlayer
                        muted={true}
                        controls={true}
                        width={"100%"}
                        url={videoLink}
                      />
                    )} */}
                  </>
                )}
                {emojibox ?
                <EmojiPicker  className="emojipicker" onEmojiClick={onEmojiClick} />
                :
                null
                }
              </Editor>
              </SharedContent>
              <AttachAssets>
                {/* <ShareButtons> */}
                <EmojiBox onClick={() => {emojibox ? setemojibox(false) : setemojibox(true)}}>
                  <img src="/images/smile-icon.png" alt="" />
                </EmojiBox>
              {props.assetArea === "Article" ? 
                null
              :
                <div className="filebuttons">
                <AssetButton onClick={() => {switchAssetArea("image")}}>
                  <img style={{height: "20px", width: "20px"}} src="/images/share-image.png" alt="" />
                </AssetButton>
                {/* <AssetButton onClick={() => {switchAssetArea("media")}}>
                  <img src="/images/share-video.png" alt="" />
                </AssetButton> */}
                <AssetButton>
                  <img style={{height: "22px", width: "22px"}} src="/images/share-event.png" alt="" />
                </AssetButton>
                <AssetButton>
                  <img style={{height: "20px", width: "20px"}} src="/images/share-hiring.png" alt="" />
                </AssetButton>
                <AssetButton>
                  <img style={{height: "18px", width: "22px"}} src="/images/share-poll.png" alt="" />
                </AssetButton>
                <AssetButton>
                  <img style={{height: "18px", width: "18px"}} src="/images/share-document.png" alt="" />
                </AssetButton>
                <AssetButton>
                  <img style={{height: "18px", width: "18px"}} src="/images/share-expert.png" alt="" />
                </AssetButton>
                </div>
              }
              </AttachAssets>
                {/* </ShareButtons> */}
              {/* <ShareComment> */}
                {/* <AssetButton>
                  <img src="/images/share-comment.png" alt="" />
                  Anyone
                </AssetButton> */}
              {/* </ShareComment> */}
            <ShareCreation>
              <img src="/images/clock.png" alt=''/>
              {props.assetArea === "Article" ? 
                  <PostButton onClick={(event) => PostArticle(event)} >
                    Publish
                  </PostButton>
                :
              <PostButton disabled={!editorText ? true : false}
              onClick={(event) => PostAPI(event)} >
                Post
              </PostButton>
              }
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 744px;
  /* max-width: 744px; */
  background-color: white;
  /* max-height: 90%; */
  overflow: initial;
  height: 592px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;

  @media (max-width:786px){
    width: 390px;
    height: 592px;
  }
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.15); */
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    margin-bottom: 18px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: transparent;
    border: none;
    img {
      pointer-events: none;
      height: 20px;
      width: 20px;
    }

    &:hover{
      background-color: rgba(0,0,0,0.1);
      border-radius: 50%;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  
  &:hover{
    background-color: rgba(0,0,0,0.1);
    border-radius: 18px;
  }
  svg,img {
    width: 56px;
    height: 56px;
  background-clip: content-box;
  border: 2px solid transparent;
  border-radius: 50%;
  }
  & > div{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 4px;

    
  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.9);
    margin-left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      margin-top: 4px;
      width: 14px;
      height: 14px;
      margin-left: 4px;
    }
  }
  p{
    /* display: flex; */
    /* justify-content: flex-start; */
    font-size: 14px;
    margin-left: 6px;
    line-height: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
  }
}
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px 12px 16px;
  border-top: 1px solid rgba(0,0,0,0.15);
  align-items: center;
  img{
    width: 20px;
    height: 20px;
    margin-right: 14px;
    cursor: pointer;
  }
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  width: 24px;
  padding: 12px 12px 12px 4px;
  min-width: auto;
  background: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  `;

const AttachAssets = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 676px;
  margin: 12px auto;
  
  ${AssetButton} {
    margin-top: 4px;
    margin-right:18px;
    width: 40px;
  }
  
  .filebuttons{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
  }

  @media (max-width:786px){
    margin: 12px 32px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    margin-right: 5px;
  }
  img{
    height: 24px;
    width: 24px;
  }
`;

const PostButton = styled.button`
  width: 68px;
  height: 36px;
  border-radius: 20px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")} ;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.05)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(0,0,0,0.7)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.05)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  height: 100%;
  textarea {
    width: 100%;
    /* height: 84%; */
    /* min-height: 100px; */
    field-sizing: content;
    resize: none;
    font-size: 20px;
    line-height: 30px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    border: none;
    outline: 0;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .emojipicker{
    height: 275px;
    width: 353px;
    position: absolute;
    top: 168px;
    left: -168px;
  }

  @media (max-width:786px){
    .emojipicker{
      top: 60px;
      left: 20px;
    }
  }

  .articlebox{
    
    p{
      width: 100%;
      background-color: #edf3f8;
      border-radius: 0 0 8px 8px;
      padding: 0 0 8px 0 ;
      span{
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

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const EmojiBox = styled.div`
    position: block;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-grow: 1;
    gap: 8px;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
      margin-left: 4px;
    }
  
`;

const mapStateTOProps = (state) => {
    return {
      User: JSON.parse(localStorage.getItem('User')),
      // user: state.userState.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    PostArticle: (payload) => dispatch(PostArticleAPI(payload)),
    PostAPI: (payload) => dispatch(PostAPI(payload)),
  });
  
  
  export default connect(mapStateTOProps, mapDispatchToProps)(PostModal);

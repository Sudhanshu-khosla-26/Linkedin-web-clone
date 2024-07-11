import styled from "styled-components";
import { connect } from "react-redux";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PostModal from "./PostModal";
import { useNavigate } from "react-router-dom";

const Articles = (props) => {
  const navigate = useNavigate();
  const [TitleText, setTitleText] = useState("");
  const [TitleImage, setTitleImage] = useState("");
  const [TitlePara, setTitlePara] = useState("");
  const [showModal, setShowModal] = useState("close");

  const module = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold"],
      ["italic"],
      [{ list: "bullet" }],
      [{ list: "ordered" }],
      ["blockquote"],
      ["code-block"],
      ["link"],
      ["image"],
    ],
  };

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

  const resetarticle = () => {
    navigate("/feed")
    
    setTitleText("");
    setTitleImage("");
    setTitlePara("");
  }

  const handleChange = (e) => {
    const image = e.target.files[0];
    // console.log(image);
    setTitleImage(image);
    console.log(TitlePara);
  };


  return (
    <>
      <Container>
        <Content>
          <Header>
            <UserInfo>
              {props.User.photoURL ? (
                <img src={props.User.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}
              <div>
                <span>
                  {props.User.displayName}
                  <img src="/images/drop-down-arrow.png" alt="" />
                </span>
                <p>Individual article</p>
              </div>
            </UserInfo>
            <TextStyleButtons>
              <div className="Styles">
                <span>
                  Style
                  <img src="/images/drop-down-arrow.png" alt="" />
                </span>
              </div>
              <div className="TextEditButtons">
                <div className="bold">
                  <img src="/images/bold-font.png" alt="" />
                </div>
                <div className="italic">
                  <img src="/images/italic-font.png" alt="" />
                </div>
                <div className="unorderdlist">
                  <img src="/images/unorderedlist.png" alt="" />
                </div>
                <div className="Orderedlist">
                  <img src="/images/orderedlist.png" alt="" />
                </div>
                <div className="Blackquote">
                  <img src="/images/quote.png" alt="" />
                </div>
                <div className="Code">
                  <img src="/images/brackets.png" alt="" />
                </div>
                <div className="Divider">
                  <img src="/images/divider.png" alt="" />
                </div>
                <div className="Link">
                  <img src="/images/link.png" alt="" />
                </div>
                <div className="Embed">
                  <img src="/images/embend-icon.png" alt="" />
                </div>
                <div className="image">
                  <img src="/images/text-image.png" alt="" />
                </div>
              </div>
            </TextStyleButtons>
            <Btns>
              <button className="Manage">
                Manage
                <img src="/images/arrow-down-btn.png" alt="" />
              </button>
              <button onClick={handleClick} >
                Next
                <img src="/images/arrow-right-btn.png" alt="" />
              </button>
            </Btns>
          </Header>
          <Article>
            {TitleImage ? (
              <>
                <div className="titleimagebox">
                  <img
                    className="titleimg"
                    src={URL.createObjectURL(TitleImage)}
                    alt=""
                  />
                  <div className="crossIcon" onClick={() => setTitleImage("")}>
                    <img src="/images/close-title-img.png" alt="" />
                  </div>
                </div>
              </>
            ) : (
              <ArticleTitleImage>
                <div className="title-gallery-image">
                  <img src="/images/article-title-image.png" alt="" />
                </div>
                <legend>
                  <p>
                    We recommend uploading or dragging in an image that is
                    <strong> 1920x1080 pixels</strong>
                  </p>
                </legend>
                <div className="imagebuttons">
                  <button>
                    <input
                      type="file"
                      accept="image/gif, image/png, image/jpeg"
                      name="image"
                      onChange={handleChange}
                    />
                    <img src="/images/uplaod-title-image.png" alt="" />
                    Upload from computer
                  </button>
                  <button>
                    <img src="/images/create-a-design.png" alt="" />
                    Create a design
                  </button>
                </div>
              </ArticleTitleImage>
            )}

            <ArticleData>
              <Title
                onChange={(e) => {
                  setTitleText(e.target.value);
                }}
                maxLength={150}
                contenteditable
                placeholder="Title"
              ></Title>
              {/* <ArticlePara onChange={(e) => {
                  setTitlePara(e.target.value);
                }}
                placeholder="Write here. You can also include @mentions." >
                </ArticlePara> */}
              <ReactQuill
                placeholder="Write here. You can also include @mentions."
                modules={module}
                theme="snow"
                value={TitlePara}
                onChange={setTitlePara}
              />
            </ArticleData>
          </Article>
        </Content>

        <PostModal resetarticle={resetarticle}
        TitlePara={TitlePara} TitleImage={TitleImage} assetArea={"Article"}
         TitleText={TitleText} showModal={showModal}  handleClick={handleClick} />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 52px;
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
  margin-left: -8px;
`;

const Content = styled.div`
  padding: 12px 0;
  width: 100%;
  height: unset;
  background-color: white;
`;

const Header = styled.div`
  background-color: white;
  position: fixed;
  z-index: 9999;
  top: 53px;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  width: 84%;
  min-width: 1128px;
  height: 48px;
  padding: 8px 110.5px 14px 110.5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  /* padding: 12px 16px; */

  /* &:hover{
    background-color: rgba(0,0,0,0.1);
    border-radius: 18px;
  } */
  svg,
  img {
    width: 40px;
    height: 40px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-left: 4px;

    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.9);
      margin-left: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-top: 4px;
        width: 14px;
        height: 14px;
        margin-left: 4px;
      }
    }
    p {
      /* display: flex; */
      /* justify-content: flex-start; */
      font-size: 13px;
      margin-left: 6px;
      line-height: normal;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.9);
    }
  }
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 78px;
    height: 30px;
    font-size: 16px;
    line-height: 20px;
    border-radius: 20px;
    padding: 6px 18px;
    display: flex;
    color: rgba(255, 255, 255, 0.624);
    font-weight: 600;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    background: #0a66c2;
    color: white;
    img {
      margin-left: 4px;
      width: 16px;
      height: 13px;
    }

    &:hover {
      background: #004182;
    }
  }

  .Manage {
    width: 110px;
    margin-right: 12px;
    background-color: white;
    border: 1px solid #0a66c2;
    color: #0a66c2;

    &:hover {
      background: #ebf4fd;
    }
  }
`;

const TextStyleButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 489px;
  height: 32px;
  padding: 4px 24px 4px 24px;
  background-color: #f4f2ee;
  border-radius: 20px;

  & > div {
  }

  .Styles {
    display: flex;
    margin-right: 0px;
    align-items: center;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 32px;
      width: 80px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.9);
      font-size: 16px;
      line-height: 20px;
      img {
        margin-left: 4px;
        width: 10px;
        height: 10px;
      }
      &:hover {
        background-color: #e9e7e4;
      }
    }
  }

  .TextEditButtons {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    & > div {
      padding: 0 8px;
      display: flex;
      align-items: center;
      height: 32px;
      &:hover {
        background-color: #e9e7e4;
      }
      img {
        width: 18px;
        height: 18px;
      }
    }
  }
`;

const ArticleTitleImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 304px;
  margin: 80px 204px 32px 204px;
  background-color: #f4f2ee;
  & > div {
    width: 720px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title-gallery-image {
    img {
      width: 64px;
      height: 64px;
    }
  }
  legend {
    display: flex;
    flex-direction: row;
    width: 487px;
    margin-bottom: 24px;
    p {
      font-size: 14px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.9);
      font-weight: 400;
    }
    strong {
      font-weight: 600;
    }
  }

  .imagebuttons {
    width: 406.7px;
    height: 32px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    & > button {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      padding: 6px 16px;
      line-height: 20px;
      color: #504f4e;
      border: 1px solid #504f4e;
      border-radius: 20px;
      cursor: pointer;

      input {
        position: absolute;
        transform: scale(1.2, 1.5);
        left: 508px;
        opacity: 0;
      }

      img {
        margin-right: 8px;
      }

      &:hover {
        color: rgba(0, 0, 0, 0.9);
        border: 1px solid rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const Article = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .titleimagebox {
    .titleimg {
      height: 404px;
      overflow: hidden;
      margin-top: 80px;
      margin-bottom: 30px;
      width: 720px;
    }

    &:hover {
      transition: 50ms cubic-bezier(0.075, 0.82, 0.165, 1);
      .titleimg {
        filter: brightness(0.7);
      }
      .crossIcon {
        opacity: 1;
        cursor: pointer;
      }
    }

    .crossIcon {
      opacity: 0;
      width: 32px;
      height: 32px;
      position: absolute;
      top: 165px;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 322px;
      border: 1px solid white;
      border-radius: 50%;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

const Title = styled.textarea`
  line-height: 46px;
  font-size: 32px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.9);
  width: 100%;
  min-height: 46px;
  resize: none;
  outline: none;
  field-sizing: content;
  border: none;
  overflow-x: hidden;
  height: auto;
`;

const ArticleData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 680px;
  width: 100%;
  overflow: hidden;
  height: 100%;
  flex-direction: column;
  margin: 0 24px !important;

  .quill {
    .ql-toolbar {
      opacity: 0;
      position: fixed;
      top: 63px;
      left: 394px;
      width: 562px;
      z-index: 9999;
      border: none;
      & > span {
        .ql-image {
          margin-left: 39px !important;
        }
        .ql-link {
          margin-left: 40px !important;
        }
      }
    }

    .ql-container{
      width: 684px !important;
      height: unset;
      border: none;
      margin: 16px 24px !important;
      .ql-editor {
      width: 100%;
      font-size: 16px;
      margin-right: 9px;
      line-height: 24px;
      font-weight: 400;
    }
  }
  }
`;

const ArticlePara = styled.textarea`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  height: 100%;
  field-sizing: content;
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  margin: 16px 24px;
`;

// const TextBox = styled.textarea`
//     font-size: 16px;
//   line-height: 24px;
//   font-weight: 400;
//   height: 100%;
//   field-sizing: content;
//   width: 100%;
//   resize: none;
//   outline: none;
//   border: none;
//   /* margin: 16px 24px; */
// `;

const mapStateTOProps = (state) => {
  return {
    User: JSON.parse(localStorage.getItem('User')),
    // user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateTOProps, mapDispatchToProps)(Articles);

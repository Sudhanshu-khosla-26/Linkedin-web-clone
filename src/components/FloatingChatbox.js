import styled from "styled-components";
import { getReciverInfoAPI, getUserChatMessageAPI } from "../actions";
import { useEffect, useRef, useState } from "react";
import React from "react";
import EmojiPicker from "emoji-picker-react";
import { ref as dbRef} from "firebase/database";
import { set } from "firebase/database";
import db from "../firebase";
import { connect } from "react-redux";
import { Timestamp } from "@firebase/firestore";
import { ref as storageRef } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";


const FloatingChatbox = (props) => {
  const [input, setInput] = useState("");
  const [ImageInfo, setImageInfo] = useState("");
  const [showemojibox, setshowemojibox] = useState(false);
  const [progress, setprogress] = useState(0)
  const [showfloatchatbox, setshowfloatchatbox] = useState(true);
  // const [fileInfo, setfileInfo] = useState("");
  // const [VidFileInfo, setVidFileInfo] = useState("");
  const [Document, setDocument] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [VideoUrl, setVideoUrl] = useState("");
  const [Attachement, setAttachement] = useState(false);
  const id = Math.floor(Math.random() * 5000);
  useEffect(()=> div.current.scrollIntoView({behavior: "smooth", block:"end"}), [])
  const div = useRef(null)
  
  useEffect(() => {
          const payload = {
              user: props.User,
              chatId: props.chatId,
          };
        props.getUserChatMessage(payload);
        props.getReciverInfo(payload);
        // alert(props.chatId);
          // console.log(props.UserChatMessages);

    }, []);
    
    
    // console.log(props.ReciverInfo, "yoyoo");


    const reset = () => {
      setImageUrl("");
      setAttachement(false);
      setImageInfo("");
      // setfileInfo("");
      setDocument("");
      setVideoUrl("");
      // setVidFileInfo("");
    };
  
    const handleUpload = (e) => {
      console.log(e.target.files[0]);
      setImageInfo(e.target.files[0]);
      const upload = storageRef(storage, `messages/${uuidv4()}`);
      const uploadTask = uploadBytesResumable(upload, e.target.files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // console.log("its working");
          let fileprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`progress: ${parseInt(fileprogress)}`)
          setprogress(parseInt(fileprogress))
          // setprogress(100)

          // if (snapshot.state === "RUNNING") {
          //   console.log(`progress: ${fileprogress}%`);
          // }
          return snapshot;
        },
        (error) => console.log(error),
        async () => {
          // console.log("hello start 2ndd then", uploadTask , uploadTask.snapshot.ref);
          const downloadTitleImg = await getDownloadURL(uploadTask.snapshot.ref);
          if (e.target.files[0].type === "application/pdf") {
            // setfileInfo(e.target.files[0]);
            setDocument(downloadTitleImg);
            // setImageInfo(e.target.files[0]);
          } else if (e.target.files[0].type === "video/mp4") {
            // setVidFileInfo(e.target.files[0]);
            setVideoUrl(downloadTitleImg);
            // setImageInfo(e.target.files[0]);
          } else {
            setImageUrl(downloadTitleImg);
            // setImageInfo(e.target.files[0]);
          }
          
          console.log(downloadTitleImg);
        }
      );
    };
  
    const onEmojiClick = (event) => {
      setInput((prevInput) => prevInput + event.emoji);
      // console.log(input, "emoji ");
    };
  
    const sendMessage = () => {
      set(dbRef(db, `Users/${props.User.uid}/Chat/${props.chatId}/${id}/`), {
        ImageUrl: ImageUrl,
        Message: input,
        SharedPost: "",
        fileInfo: {
          fileName: ImageInfo?.name ? ImageInfo?.name : "",
          fileSize: ImageInfo?.size ? ImageInfo?.size : "",
        },
        VideoURL: VideoUrl,
        docsURL: Document,
        description: "",
        messageId: `${id}`,
        userInfo: props.User,
        // timestamp:  new Date(Timestamp.now().seconds * 1000).toString(),
        timestamp: Timestamp.now(),
      });
      set(dbRef(db, `Users/${props.chatId}/Chat/${props.User.uid}/${id}/`), {
        ImageUrl: ImageUrl,
        Message: input,
        SharedPost: "",
        fileInfo: {
          fileName: ImageInfo?.name ? ImageInfo?.name : "",
          fileSize: ImageInfo?.size ? ImageInfo?.size : "",
        },
        VideoURL: VideoUrl,
        docsURL: Document,
        description: "",
        messageId: `${id}`,
        userInfo: props.User,
        timestamp: Timestamp.now(),
        // timestamp: new Date(Timestamp.now().seconds * 1000).toString(),
      });
      set(
        dbRef(
          db,
          `Users/${props.User.uid}/UserConnections/${props.chatId}/ConnectData/Chat/${id}/`
        ),
        {
          ImageUrl: ImageUrl,
          Message: input,
          SharedPost: "",
          fileInfo: {
            fileName: ImageInfo?.name ? ImageInfo?.name : "",
            fileSize: ImageInfo?.size ? ImageInfo?.size : "",
          },
          VideoURL: VideoUrl,
          docsURL: Document,
          description: "",
          messageId: `${id}`,
          userInfo: props.User,
          timestamp: Timestamp.now(),
          // timestamp: new Date(Timestamp.now().seconds * 1000).toString(),
        }
      );
      set(
        dbRef(
          db,
          `Users/${props.chatId}/UserConnections/${props.User.uid}/ConnectData/Chat/${id}/`
        ),
        {
          ImageUrl: ImageUrl,
          Message: input,
          SharedPost: "",
          fileInfo: {
            fileName: ImageInfo?.name ? ImageInfo?.name : "",
            fileSize: ImageInfo?.size ? ImageInfo?.size : "",
          },
          VideoURL: VideoUrl,
          docsURL: Document,
          description: "",
          messageId: `${id}`,
          userInfo: props.User,
          timestamp: Timestamp.now(),
          // timestamp: new Date(Timestamp.now().seconds * 1000).toString(),
        }
      );
  
      setInput("");
      setImageUrl("");
      setAttachement(false);
      setImageInfo("");
      // setfileInfo("");
      setDocument("");
      setVideoUrl("");
    };

  return (
    <>
      {props.ReciverInfo && 
         <Container >
         <Box style={showfloatchatbox === false ? {width: "224px"} : null}>

         <div style={showfloatchatbox === false ? {height: "43px"} : null} 
          className="chat_titleInfo_bar" onClick={() => {showfloatchatbox? setshowfloatchatbox(false) : setshowfloatchatbox(true)}}>
          <div className="userside">
            <div className="reciverimg">
              <img src={props.ReciverInfo?.profilephoto} alt="" />
              <img src="/images/active.png" alt="" className="active" />
            </div>
            <div>
            <span>{props.ReciverInfo?.Name}</span>
            {showfloatchatbox &&
            <span className="descrition">{props.ReciverInfo?.Description}</span>
            }
            </div>
          </div>

          <div className="headerbarbutton">
            {showfloatchatbox &&
            
            <>
            <div className="morebtn">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nO3SMQrAIBBE0V95dE3umfUaCYJsEZZUcZNiHtjIH7AQREREfqYAO9ABA7Z5t7pzIzhvpyV0rgeDcbe6cxYMjoTOtWBQEzpX5sjmS+vD53qzExER4TMXBaxSQgA4HO4AAAAASUVORK5CYII="
                alt=""
                />
            </div>

            <div className="videocall">
              <img src="/images/video.png" alt="" />
            </div>

            <div className="Minimizebtn">
              <img src="/images/minimize.png" alt="" />
            </div>
              </>
             }
            <div className="cancle" onClick={()=> {props.blank("")}}>
              <img src="/images/cross-icon.png" alt="" />
            </div>
          </div>
        </div>
        {showfloatchatbox &&<div
          style={Attachement ? { height: "299px" } : null}
          className="middlesection"
        >
          <div className="chat_UserInfo">
            <img src={props.ReciverInfo?.profilephoto} alt="" />

            <span>
              {props.ReciverInfo?.Name}
              <span>(He/Him) · 1st</span>
            </span>
            <div className="decription">{props.ReciverInfo?.Description}</div>
          </div>
          <div className="chatmessagesbox" ref={div}>
            <div className="date_line">
              <div></div>

              <span>TUESDAY</span>
              <div></div>
            </div>
            {props.UserChatMessages.length > 0 &&
              props.UserChatMessages.map((item, index) => (
                <div className="messageContainer" key={index}>
                  <a>
                    <img src={item.userInfo.photoURL} alt="" />
                  </a>
                  <div className="msgheader">
                    <div className="msginfo">
                      <span className="nameofmesseger">
                        {item.userInfo.displayName}
                        {/* {item.timestamp.seconds.valueOf()} */}
                        {/* {console.log(new Date(item.timestamp.seconds * 1000))} */}
                      </span>
                      <span className="gender_timestamp">
                        (He/Him)
                        <span>
                          ·{" "}
                          {new Date(item.timestamp.seconds * 1000)
                            .toString()
                            .slice(16, 18) < 12
                            ? new Date(item.timestamp.seconds * 1000)
                                .toString()
                                .slice(16, 21) + " AM"
                            : parseInt(
                                new Date(item.timestamp.seconds * 1000)
                                  .toString()
                                  .slice(16, 18)
                              ) -
                              12 +
                              " : " +
                              parseInt(
                                new Date(item.timestamp.seconds * 1000)
                                  .toString()
                                  .slice(19, 21)
                              ) +
                              " PM"}
                        </span>
                      </span>
                    </div>
                    {item.ImageUrl ? (
                      <>
                        <div  className="message">
                          <p>{item.Message}</p>
                        </div>
                        <div className="message">
                          <p>
                            <img src={item.ImageUrl} alt="" />
                          </p>
                        </div>
                      </>
                    ) : item.docsURL ? (
                      <>
                        <div className="message">
                          <p>{item.Message}</p>
                        </div>
                        <div className="message">
                          <p>
                            <>
                            <div className="filesbox">
                              <div className="downloadfile">
                                <a
                                  style={{ textDecoration: "none" }}
                                  href={item.docsURL}
                                  download={item.fileInfo?.fileName}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span>
                                    <img src="/images/download.png" alt="" />
                                    Download
                                  </span>
                                </a>
                              </div>
                              <img src="/images/PDF.png" alt="" />
                              <div className="filesinfo">
                                <span>
                                  {item.fileInfo?.fileName.slice(0, 23) + "..."}
                                </span>
                                <p>
                                  {parseInt(
                                    parseInt(item.fileInfo?.fileSize) / 1000
                                  )}{" "}
                                  KB
                                </p>
                                </div>
                            </div>
                            </>
                              </p>
                        </div>
                      </>
                    ) : item.VideoURL ? (
                      <>
                        <div className="message">
                          <p>{item.Message}</p>
                        </div>
                        <div className="message">
                          <p>
                            <>
                         
                            <div className="filesbox">
                              <div className="downloadfile">
                                <a
                                  style={{ textDecoration: "none" }}
                                  href={item.VideoURL}
                                  download={item.fileInfo?.fileName}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <span>
                                    <img src="/images/download.png" alt="" />
                                    Download
                                  </span>
                                </a>
                              </div>
                              <img src="/images/video-icon.png" alt="" />
                              <div className="filesinfo">
                                <span>
                                  {item.fileInfo?.fileName.slice(0, 23) + "..."}
                                </span>
                                <p>
                                  {parseInt(
                                    parseInt(item.fileInfo?.fileSize) / 1000
                                  )}{" "}
                                  KB
                                </p>
                              </div>
                            </div>
                            </>
                            </p>
                        </div>
                      </>
                    ) : (
                      <div  className="message">
                        <p>{item.Message}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>}
        
        {/* (ImageUrl || Document || VideoUrl ) */}
         {Attachement && ( 
           <div className="filesection"> 
             {ImageInfo.type === "application/pdf" || 
             ImageInfo.type === "video/mp4" ? ( 
               <div className="filebox"> 
                 {ImageInfo.type === "video/mp4" ? ( 
                   <img src="/images/video-icon.png" alt="" /> 
                ) : ( 
                  <img src="/images/PDF.png" alt="" /> 
                 )} 
              </div> 
             ) : ( 
               <div className="fileimgbox"> 
                 <img src={ImageUrl} alt="" /> 
               </div> 
             )} 
             <div className="fileinfo">
              <div className="name_size">
                <span> 
                   {ImageInfo.name} 
                   <span>· {parseInt(parseInt(ImageInfo.size) / 1000)} KB</span> 
                 </span> 
                <p>Attached</p> 
                 <div 
                style={{width: `${progress}%`,margin: "6px 0", color: "blue",backgroundColor: "blue", height: "4px"}}
                className="loadingbar">
                  {progress === 100 ? setprogress(0) : null}
                </div>
             
               </div> 
               <div className="cancleattachment" onClick={() => reset()}> 
                 <img src="/images/cross-icon.png" alt="" /> 
               </div> 
             </div> 
           </div> 
         )} 

        { showfloatchatbox && <div className="lastsection">
          <div className="msgcontent">
            <form>
              <textarea
                value={input}
                onInput={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Write a message..."
              ></textarea>
            </form>
            <div className="msgbuttons">
              <button className="expandbtn">
                <img src="/images/arrow-up.png" alt="" />
              </button>
              <button 
               className="sendbtn"   onClick={
                ()=> {
                  if(!input === "" || Document || ImageUrl || VideoUrl) {
                    sendMessage()
                  }
                  else if(input){
                    sendMessage()
                  }
                }
              }
               >
                <img src="/images/send.png" alt="" />
              </button>
            </div>
          </div>
          <div className="files_and_aibox">
            <div className="writeai">
              <span>
                <img src="/images/golden.jpeg" alt="" />
                Write with AI
              </span>
            </div>

            <div className="functionbuttons">
              <button className="imageBtn">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleUpload(e);
                    setAttachement(true);
                  }}
                />
                <img src="/images/share-image.png" alt="" />
              </button>
              <button className="attachbtm">
                <input
                  type="file"
                  accept=".pdf, video/*"
                  onChange={(e) => {
                    handleUpload(e);
                    setAttachement(true);
                  }}
                />
                <img src="/images/attach-file.png" alt="" />
              </button>
              <button>
                <img src="/images/gif.png" alt="" />
              </button>
              <button className="smilebtn" >
               {showemojibox && <EmojiPicker 
                  height={"250px"}
                  width={"330px"}
                  className="emojipickers"
                  onEmojiClick={onEmojiClick}
                /> }
                <img onClick={() => showemojibox ? setshowemojibox(false) : setshowemojibox(true)} src="/images/smile-icon.png" alt="" />
              </button>
              <button>
                <img src="/images/more.png" alt="" />
              </button>
            </div>
          </div>
        </div> }
         </Box>
    </Container>
         } 
    </>
  )
}

const Container = styled.div`
  width: unset;
  height: unset;
`;

const Box = styled.div`
  max-height: 547px;
  height: unset;
  /* height: unset; */
  width: 500px;
  background-color: #ffffff;
  /* border-radius: 9px; */
  border-top-right-radius: 9px;
  border-top-left-radius: 9px;
  z-index: 4;
  border: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 326px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .chat_titleInfo_bar{
    display:flex ;
    padding: 2px 12px ;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    &:hover{
        background-color: #ebf4fd;
    }
    .userside{
      display: flex;
      flex-grow: 1;
      flex-direction: row;
      align-items: center;
      width: 275px;
      /* text-align: start; */
      overflow-y: hidden;

      .reciverimg{
        position: relative;
        margin-right: 8px ;
        img{
          border-radius: 50%;
          width: 32px;
          height: 32px;
        }
        .active {
          position: absolute;
          height: 12px;
          border: 1px solid white;
          width: 12px;
          border-radius: 50%;
          top: 19px;
          left: 19px;
        }      }

      & > div{
      display: flex;
      /* flex-grow: 1; */
      flex-direction: column;
        span{
          font-weight: 600;
          font-size: 15px;
          line-height: 20px;
          cursor: pointer;
          color: rgba(0,0,0,0.9);
          &:hover{
            color: #0a66c2;
            text-decoration: underline #0a66c2;
          }
        }
      }

      .descrition{
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        cursor:default ;
        color: rgba(0,0,0,0.6);
        &:hover{
          color: rgba(0,0,0,0.6);
          text-decoration: none;
        }
      }
    }

    .headerbarbutton{
      display: flex;
      align-items: center;

      & > div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        z-index: 20;
        align-items: center;
        &:hover{
          background-color: rgba(0,0,0,0.05);
        }
        img{
          width: 16px;
          height: 16px;
        }
      }
    
/* 
      .morebtn{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          background-color: rgba(0,0,0,0.05);
        }
        img{
          width: 24px;
          height: 24px;
        }
      }

      .videocall{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          background-color: rgba(0,0,0,0.05);
        }
        img{
          width: 24px;
          height: 24px;
        }
      } */

    }
  }

  .middlesection{
    width: 500px;
    height: 356px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 10px;
    .chat_UserInfo{
    display: flex;
    flex-direction: column;
    text-align: start;
    padding: 12px 12px;
    img{
      width: 72px;
      cursor: pointer;
      height: 72px;
      border-radius: 50%;
    }
    span{
      display: flex;
      cursor: pointer;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      color: rgba(0,0,0,0.9);
      padding: 4px 0px 0 16px;
      /* &:hover{
        text-decoration: underline;
      } */
      span{
        padding: 0;
        margin-left: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: rgba(0,0,0,0.6);
      }
    }

    .decription{
      padding: 0px 0px 0 16px;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: rgba(0,0,0,0.9);
    }
  }

  .chatmessagesbox{
    .date_line{
      justify-content: center;
      display: flex;
      align-items: center;
      & > div{
        height: 1px;
        margin: 0 12px ;
        background-color: rgba(0,0,0,0.2);  
        padding: 0px 90px;
      }
      span{
        font-weight: 600;
        font-size: 12px;
        line-height: 16px;
        color: rgba(0,0,0,0.6);
      }
    }
  
    .messageContainer{
      display: flex;
      padding: 12px 0 0 0;
      position: relative;
      a{
        position: absolute;
        padding-left: 12px;
        margin-top: 4px;
        cursor: pointer;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .msgheader{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 395.5px;
        
        .msginfo{
          text-align:start;
          display: flex;
          align-items: center;
          padding-left: 60px;
          height: 19.9px;
          width: 395.5px;

          .nameofmesseger{
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            line-height:  20px;
            color: rgba(0,0,0,0.9);
            &:hover{  
              color:  rgb(10, 102, 194);
              text-decoration: underline rgb(10, 102, 194);
            }
          }

            .gender_timestamp{
              margin-left: 8px;
              font-weight: 400;
              font-size: 12px;
              line-height: 16px;
              cursor: default;
              color: rgba(0,0,0,0.6);
              span{
                margin-left: 6px;
              }
            }
        }
        .message{
          width:500px;
          height: unset;
          &:hover{
            background-color: rgba(0,0,0,0.1);
          }
          p{
            text-align: start;
            width: 335.5px;
            height: unset;
            padding-right: 12px;
            margin: 4px 0 4px 60px;
            img{
              width: 142.2px;
              height: 190px;
            }
          
            .filesbox{
              max-width: 230px;
              border-radius: 9px;
              max-height: 64px;
              border: 1px solid #EBEBEB;
              display: flex;
              background-color: #FFFFFF;
              align-items: center;
   

            .downloadfile{
              position: absolute;
              z-index: 4;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              display: flex;
              /* justify-content: center; */
              align-items: center;
              span{
                font-weight: 500;
                color: rgba(0,0,0,0.8);
                font-size: 16px;
                line-height: 16px;
                opacity: 0; 
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 65px;
                width: 230px;
                border-radius: 9px;
                &:hover{
                  opacity: 1;
                  transition: opacity 0.2s ease-in-out;
                  background-color: rgba(239, 239, 240, 0.6);
                  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
                }
                padding: 0;
                margin-left: 48.4px;
                margin-top: 32px;
                img{
                  width: 16px;
                  height: 16px;
                }
              }
            }

            img{
            border-radius: 9px 0 0 9px;
            width: 44px;
            height: 64px;
          }
          .filesinfo{
            margin-left: 10px;
            text-align: start;
            max-height: 64px;
            span{
              font-weight: 600;
              color: rgba(0,0,0,0.9);
              font-size: 13px;
              line-height: normal;
            }
            p{
              padding: 0;
              margin: 4px 0 ;
              text-align: start;
              font-weight: 400;
              color: rgba(0,0,0,0.6);
              font-size: 13px;
              line-height: normal;
            }
          }
        }
          }
        }

     
    }
  }
}
  }

  .filesection{
    display: flex;
    width: 472.4px;
    height: 40px;
    padding: 8px 16px 8px 12px;
    border-top: 1px solid #EBEBEB;

    .fileimgbox{
      margin-left: 6px;
      img{
        width: 26.6px;
        height: 39.9px;
      }
    }

    .filebox{
      margin-left: 6px;
      img{
        width: 40px;
        height: 40px;
      }
    }

    .fileinfo{
      margin-left: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .name_size{
        width: 380px;
        text-align: start;
        span{
          font-weight: 600;
          font-size: 12px;
          line-height: 15px;
          color: rgba(0,0,0,0.6);

          span{
            margin-left: 5px;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            color: rgba(0,0,0,0.6);
          }
        }
        p{
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          color: rgba(0,0,0,0.6);
        }
      }

      .cancleattachment{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        img{
          width: 16px;
          height: 16px;
        }
        &:hover{
          background-color: rgba(0,0,0,0.05);
        }
      }
    }
  }


  .lastsection{
    display: flex;
    flex-direction: column;
    border-top: 3px solid rgba(0,0,0,0.1);
    padding: 12px 0 ;
    .msgcontent{
      padding-top: 0 12px;
      width: 500px;
      height: 124px;
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      border-bottom: 1px solid rgba(0,0,0,0.2);
      form{
        margin-left: 12px;
        /* margin: 12px 48px 12px 12px; */
        width: 416px;
        background-color: #F4F2EE;
        padding: 12px;
        border-radius: 12px;
        height: unset;
        max-height: 82px;
        textarea{
          height: unset;
          max-height: 82px;
          outline: none;
          background-color: #F4F2EE;
          field-sizing: content;
          border: none;
          width: 410px;
          resize: none;
        }
      }
      .msgbuttons{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 8px;
        gap: 40px;
        & > button{
          border: none;
          outline: none;
          border-radius: 50%;
          background: #fff;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          padding: 7px;
          justify-content: center;
        }

        .expandbtn{
          /* margin-bottom: 60px; */
          cursor: pointer;
          img{
            display: flex;
          align-items: center;
          justify-content: center;
            width: 16px;
            height: 16px;
          }
          &:hover{
            background-color: rgba(0,0,0,0.15);
          }
        }

        .sendbtn{
          background-color: rgba(0,0,0,0.15);
          margin-bottom: 30px;
          cursor: pointer;
          background-color: #0A66C2;
          /* ${(props) =>
            props.disabled &&
            `
              filter: invert(0.40), 
              cursor: no-drop,
          `} */
          img{
            display: flex;
          align-items: center;
          justify-content: center;
            width: 16px;
            height: 16px;
          }
        }
      }
    }

    .files_and_aibox{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      margin-top: 6px;
      .writeai{
        span{
          line-height: 20px;
          font-size: 16px;
          font-weight: 600;
          padding: 8px;
          color: rgba(0,0,0,0.7);
          &:hover{
            background-color: rgba(0,0,0,0.05);
            color: rgba(0,0,0,0.9);
          }
          img{
            width: 12px;
            height: 12px;
            margin-right: 4px;
          }
        }
      }

      .functionbuttons{
        border: none;
        & > button{
          border: none;
          outline: none;
          padding: 7px;
          cursor: pointer;
          border-radius:50%;
          background-color: transparent;
          img{
            filter: contrast(3.5);
            width: 16px;
            height: 16px;
          }
          &:hover{
            background-color: rgba(0,0,0,0.05);
          }
        }

        .imageBtn{
          input{
            width: 18px;
            height: 18px;
            /* padding: 7px; */
            cursor: pointer !important;
            z-index: 2;
            position: absolute;
            opacity: 0;
            &:hover{
            background-color: rgba(0,0,0,0.05);
          }
          }
        }
        

        .attachbtm{
          input{
            width: 18px;
            height: 18px;
            /* padding: 7px; */
            cursor: pointer !important;
            z-index: 2;
            position: absolute;
            opacity: 0;
            &:hover{
            background-color: rgba(0,0,0,0.05);
          }
          }
        }

        .smilebtn{
          .emojipickers{
            bottom: 81px;
            right: 305px;
            position: fixed;
            /* height: 250px;
            width: 330px;   */
    .epr_-kg0voo {
        display: none;
    }
          }
        }


      }
    }
  }
`;

const mapStateTOProps = (state) => {
    return {
      User: JSON.parse(localStorage.getItem("User")),
      user: state.userState.user,
      UserChatMessages: state.articleState.UserChatMessages,
      ReciverInfo: state.articleState.ReciverInfo,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    getUserChatMessage: (payload) => dispatch(getUserChatMessageAPI(payload)),
    getReciverInfo: (payload) => dispatch(getReciverInfoAPI(payload))
  });
  
  export default connect(mapStateTOProps, mapDispatchToProps)(FloatingChatbox);

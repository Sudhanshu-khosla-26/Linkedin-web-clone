import { auth, provider, storage } from "../firebase";
import {GET_RECIVER_INFO,GET_USER_CHAT_MESSAGE,GET_USER_FEED, GET_USER_CONNECTIONS_POSTS, SET_USER,GET_USER_CONNECTION_INVITE_SENDED_LIST, SET_LOADING_STATUS,GET_USER_CONNECTION_INVITESLIST, GET_ARTICLES ,GET_NETWORK, GET_USER_CONNECTIONLIST} from "./actionTypes";
import db from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { ref as storageRef } from "firebase/storage";
import { ref as dbRef, } from "firebase/database";
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { set, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';



export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
})

export const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
})

export const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
})

export const getNetwork = (payload) => ({
    type: GET_NETWORK,
    payload: payload,
})

export const getUserconnectionlist = (payload) => ({
    type: GET_USER_CONNECTIONLIST,
    payload: payload,
})

export const getUserconnectinvites = (payload) => ({
    type: GET_USER_CONNECTION_INVITESLIST,
    payload: payload,
})

export const getUserconnectInviteSended = (payload) => ({
    type: GET_USER_CONNECTION_INVITE_SENDED_LIST,
    payload: payload,
})

export const getUserconnectionsPosts = (payload) => ({
    type: GET_USER_CONNECTIONS_POSTS,
    payload: payload,
})


export const getUserFeed = (payload) => ({
    type: GET_USER_FEED,
    payload: payload,
})

export const getUserChatMessage = (payload) => ({
    type: GET_USER_CHAT_MESSAGE,
    payload: payload,
})

export const getReciverInfo = (payload) => ({
    type: GET_RECIVER_INFO,
    payload: payload,
})


export function signInAPI() {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                dispatch(setUser(payload.user))
            }).catch((error) => {
                alert(error.message);
            });
    }
}

export function getUserAuth() {
    return (dispatch) => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            localStorage.setItem('User', JSON.stringify(user));
            set(dbRef(db, `Users/${user.uid}/UserInfo`), {
                    Name: user.displayName,
                    profilephoto: user.photoURL,
                    Institue: "",
                    Description: "Frontend Developer | Btech 1st Year Student |",
                    Address: {
                        City: "New Delhi",
                        Country: 'India',
                        PINCode: '110018',
                    }
            })
            }
        });
    }
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null));
            localStorage.removeItem('User');
            })
            .catch((error) => {
                // console.log(error.message);
            })
    }
}


export function PostAPI(payload) {
    const id = (Math.floor(Math.random() * 5000))
    return (dispatch) => {
        dispatch(setLoading(true));
        // console.log("frist check");
        if (payload.PhotoImage) {
            const upload = storageRef(storage, `images/${uuidv4()}`,)
            const uploadTask = uploadBytesResumable(upload, payload.PhotoImage);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // console.log("its working");
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`progress: ${progress}%`)
                    if (snapshot.state === 'RUNNING') {
                        console.log(`progress: ${progress}%`);
                    }
                    return snapshot;
                },
                (error) => console.log(error),
                async () => {
                    // console.log("hello start 2ndd then", uploadTask , uploadTask.snapshot.ref);
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    // console.log(downloadURL, "working");
                    // console.log("hello start",  dbRef(db, 'articles/'));
                    // console.log("hello start", payload.user.uid);
                    set(dbRef(db, `Users/${payload.user.uid}/UserPost/${id}`), {
                        actor: {
                            description: payload.user.email,
                            PostTitle: payload.user.displayName,
                            Date: payload.timestamp,
                            profilephoto: payload.user.photoURL,
                        },
                        // Article: {
                        //     Paragraph: payload.Paragraph,
                        //     Title: payload.Title,
                        //     TitleImage: payload.TitleImage,
                        // },
                        Photovideo: "",
                        PhotoImage: downloadURL,
                        comments: {
                            commentid:{
                                commentid:'',
                                    userInfo: "",
                                    connectid: "",
                                    Comment: "",
                                    Description: "",
                                    commenterid: '',
                            }
                        },
                        description: payload.description,
                        postid: `${id}`,
                        userid: payload.user.uid,
                        Likes: {
                            userid: {
                                ConnectData: {
                                    userInfo: "",
                                    connectid: "",
                                    Description: "",
                                  },
                            }
                        },
                    })
                    // console.log("hello end");
                    dispatch(setLoading(false));
                })
        }
        else {
            set(dbRef(db, `Users/${payload.user.uid}/UserPost/${id}`), {
                actor: {
                    description: payload.user.email,
                    PostTitle: payload.user.displayName,
                    Date: payload.timestamp,
                    profilephoto: payload.user.photoURL,
                },
                // Article: {
                //     Paragraph: payload.Paragraph,
                //     Title: payload.Title,
                //     TitleImage: payload.TitleImage,
                // },
                Photovideo: "",
                PhotoImage: "",
                comments: {
                    commentid:{
                            commentid:'',
                            userInfo: "",
                            Comment: "",
                            connectid: "",
                            Description: "",
                            commenterid: '',
                    }
                },
                description: payload.description,
                postid: `${id}`,
                userid: payload.user.uid,
                Likes: {
                    userid: {
                        ConnectData: {
                            userInfo: "",
                            connectid: "",
                            Description: "",
                          },
                    }
                },
            })
            dispatch(setLoading(false));
        }
    }
}

export function PostArticleAPI(payload){
    const id = (Math.floor(Math.random() * 5000))
    return (dispatch) => {
        dispatch(setLoading(true));
        // console.log("frist check");
        if (payload.Title !== '') {
            const upload = storageRef(storage, `articleimg/${uuidv4()}`,)
            const uploadTask = uploadBytesResumable(upload, payload.TitleImage);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // console.log("its working");
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`progress: ${progress}%`)
                    if (snapshot.state === 'RUNNING') {
                        console.log(`progress: ${progress}%`);
                    }
                    return snapshot;
                },
                (error) => console.log(error),
                async () => {
                    // console.log("hello start 2ndd then", uploadTask , uploadTask.snapshot.ref);
                    const downloadTitleImg = await getDownloadURL(uploadTask.snapshot.ref);
                    // console.log(downloadURL, "working");
                    // console.log("hello start",  dbRef(db, 'articles/'));
                    // console.log("hello start", payload.user.uid);
                    set(dbRef(db, `Users/${payload.user.uid}/UserPost/${id}`), {
                        actor: {
                            description: payload.user.email,
                            PostTitle: payload.user.displayName,
                            Date: payload.timestamp,
                            profilephoto: payload.user.photoURL,
                        },
                        Article: {
                            Paragraph: payload.Paragraph,
                            Title: payload.Title,
                            TitleImage: downloadTitleImg,
                        },
                        comments: {
                            commentid:{
                                    commentid:'',
                                    userInfo: "",
                                    connectid: "",
                                    Comment: "",
                                    Description: "",
                                    commenterid: '',
                            }
                        },
                        description: payload.description,
                        postid: `${id}`,
                        userid: payload.user.uid,
                        Likes: {
                            userid: {
                                ConnectData: {
                                    userInfo: "",
                                    connectid: "",
                                    Description: "",
                                  },
                            }
                        },
                    })
                    // console.log("hello end");
                    dispatch(setLoading(false));
                })
        }
    }
}


export function getNetworkAPI(){
    return (dispatch) => {
        let payloadNetwork;
        onValue(dbRef(db, `Users/`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data, typeof(data));
            // payload = data;
            const arrayData = [];
            for (let id in data) {
                arrayData.push({ ...data[id], id });
            }
            payloadNetwork = arrayData;
            // console.log(payloadNetwork);
            // {payloadNetwork.map((Data, Key) => ( 
            //         console.log(Data, Key)
            //     ))}
            // console.log(arrayData, typeof(arrayData));      
            
            // console.log(payload, payload.length);
            dispatch(getNetwork(payloadNetwork));
        });
    }
}

export function getAritcleAPI(payload) {
    return (dispatch) => {
        let payloadArticle;


        // get(db, 'articles/').on('value', (snapshot) => {
        //     const data = snapshot.val();
        //     console.log(data);
        //     const arrayData = [];
        //     for (let id in data) {
        //         arrayData.push({...data[id], id });
        //     }
        //     payload = {...arrayData};
        //     console.log(payload);

        return onValue(dbRef(db, `Users/${payload.user.uid}/UserPost/`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data, typeof(data));
            // payload = data;
            const arrayData = [];
            for (let id in data) {
                arrayData.push({ ...data[id], id });
            }
            // console.log(arrayData, typeof(arrayData));
            payloadArticle = arrayData;
            // console.log(payload, payloadArticle);
            payloadArticle.sort((a, b) => 
                (b.actor.Date.seconds) - (a.actor.Date.seconds))
            dispatch(getArticles(payloadArticle));
        });
    }
}



export function getUserconnectionlistAPI(payload){
    let UserConnectionslist;
    return (dispatch) => {
        onValue(dbRef(db, `Users/${payload.user.uid}/UserConnections/`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data, typeof(data));
            // payload = data;
            const arrayData = [];
            for (let id in data) {
                arrayData.push({ ...data[id], id });
            }
            UserConnectionslist = arrayData;
            // console.log(UserConnectionslist);
            dispatch(getUserconnectionlist(UserConnectionslist));
          })
    }
}

export function getUserconnectInvitesAPI(payload){
    let UserConnectionsInvite;
    return (dispatch) => {
        onValue(dbRef(db, `Users/${payload.user.uid}/UserConnectionsInvite/`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data, typeof(data));
            // payload = data;
            const arrayData = [];
            for (let id in data) {
                arrayData.push({ ...data[id], id });
            }
            UserConnectionsInvite = arrayData;
            // console.log(UserConnectionsInvite);
            dispatch(getUserconnectinvites(UserConnectionsInvite));
          })
    }
}

export function getUserconnectInviteSendedAPI(payload){
    let UserconnectInviteSended;
    return (dispatch) => {
        onValue(dbRef(db, `Users/${payload.user.uid}/UserConnectionInviteSended/`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data, typeof(data));
            // payload = data;
            const arrayData = [];
            for (let id in data) {
                arrayData.push({ ...data[id], id });
            }
            UserconnectInviteSended = arrayData;
            // console.log(UserconnectInviteSended);
            dispatch(getUserconnectInviteSended(UserconnectInviteSended));
          })
    }
}


export function getUserconnectionsPostsAPI(payload) {
    // console.log('payload', payload);
    let UserconnectionsPosts = [];
    
    const ids = payload.Userconnections.map((Data, id)=> Data.ConnectData.connectid);

    // console.log(ids);

    const postsPromises = ids.map((id)=>{
        return new Promise((resolve, reject) => {
            onValue(dbRef(db, `Users/${id}/UserPost/`), (snapshot) => {
                const data = snapshot.val();
                return resolve(data);
            });
        }); 
    });

    return (dispatch) => {
        
        return Promise.all(postsPromises).then(val=>{
            // console.log('allposts', val);
            
            val.forEach(element => {
                if(element) {
                    UserconnectionsPosts = [...UserconnectionsPosts,...Object.values(element)];
                    // console.log(Object.values(element));
                }
            });
            UserconnectionsPosts.sort((a, b) => 
                (b.actor.Date.seconds) - (a.actor.Date.seconds))
            // console.log("UserconnectionsPosts", UserconnectionsPosts);
            dispatch(getUserconnectionsPosts(UserconnectionsPosts));
        }).catch(err=>{
            console.error(err);
        })
    
    };      
}


export function postUserFeedAPI(payload){
    return(dispatch) => {
        dispatch(setLoading(true));
        payload.UserFeed.sort((a, b) => 
            (b.actor.Date.seconds) - (a.actor.Date.seconds))
        set(dbRef(db, `Users/${payload.user.uid}/UserFeed/`), {
            Posts: payload.UserFeed,
        })
        dispatch(setLoading(false));
    }
}


export function getUserFeedAPI(payload){
    let UserFeed = [];
    return (dispatch) => {
        dispatch(setLoading(true));
        onValue(dbRef(db, `Users/${payload.user.uid}/UserFeed/Posts/`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data, typeof(data));
            // payload = data;
            const arrayData = [];
            for (let id in data) {
                arrayData.push({ ...data[id], id });
            }
            UserFeed = arrayData;
            UserFeed.sort((a, b) => 
                (b.actor.Date.seconds) - (a.actor.Date.seconds))
            // console.log(UserconnectInviteSended);
            dispatch(getUserFeed(UserFeed), setLoading(false));
          })
    }
}


export function getUserChatMessageAPI(payload){
    let UserChat = [];
    return (dispatch) => {
                dispatch(getUserChatMessage(UserChat));

           onValue(dbRef(db,
            `Users/${payload.user.uid}/UserConnections/${payload.chatId}/ConnectData/Chat/`)
           ,(snapshot) => {
            const data = snapshot.val();
            // console.log(data, typeof(data));
            // payload = data;
            const arrayData = [];
            for (let id in data) {
                arrayData.push({ ...data[id], id });
            }
            UserChat = arrayData;
            UserChat.sort((a, b) => 
                (a.timestamp.seconds) - (b.timestamp.seconds))
            // console.log(UserChat);
            dispatch(getUserChatMessage(UserChat));
          })
    }
}

export function getReciverInfoAPI(payload) {
    let Reciver = [];
    return (dispatch) => {
        onValue(dbRef(db, `Users/${payload.chatId}/UserInfo/`), (snapshot) => {
            const data = snapshot.val();
            // const arrayData = [];
            // console.log(data, "1");
            Reciver = data
            // console.log(Reciver, "2")
            dispatch(getReciverInfo(Reciver));
        });
    }
}
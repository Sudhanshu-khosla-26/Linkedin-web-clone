import { auth, provider, storage } from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionTypes";
import db from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { ref as storageRef } from "firebase/storage";
import { ref as dbRef } from "firebase/database";
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
                console.log(error.message);
            })
    }
}


export function PostAPI(payload) {
    const id = (Math.floor(Math.random() * 5000))
    return (dispatch) => {
        dispatch(setLoading(true));
        // console.log("frist check");
        if (payload.PhotoImage !== '') {
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
                        comments: 0,
                        description: payload.description,
                    })
                    // console.log("hello end");
                    dispatch(setLoading(false));
                })
        }
        // else if (payload.video) {
        //     set(dbRef(db, `articles/${id}`), {
        //         actor: {
        //             description: payload.user.email,
        //             title: payload.user.displayName,
        //             date: payload.timestamp,
        //             image: payload.user.photoURL,
        //         },
        //         video: payload.video,
        //         sharedImg: "",
        //         comments: 0,
        //         description: payload.description,
        //     })
        //     dispatch(setLoading(false));
        // }
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
                        comments: 0,
                        description: payload.description,
                    })
                    // console.log("hello end");
                    dispatch(setLoading(false));
                })
        }
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
            // console.log(payload, payload.length);
            dispatch(getArticles(payloadArticle));
        });
    }
}


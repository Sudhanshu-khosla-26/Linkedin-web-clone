import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyCZFuHY622Ftn0NGpzxiE83qaX3eJGirGA",
  authDomain: "linkedin-clone-df57c.firebaseapp.com",
  databaseURL: "https://linkedin-clone-df57c-default-rtdb.firebaseio.com",
  projectId: "linkedin-clone-df57c",
  storageBucket: "linkedin-clone-df57c.appspot.com",
  messagingSenderId: "342846356134",
  appId: "1:342846356134:web:cfe1e2fc7bbc5056e7d267",
  measurementId: "G-ZCJ5S3V4L5"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export {auth, provider, storage};
export default db;

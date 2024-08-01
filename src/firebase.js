import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBL6yNDYSUm3bZdGvNCVhQ1bbHU_1n9KbE",
  authDomain: "linkedin-clone-24830.firebaseapp.com",
  databaseURL: "https://linkedin-clone-24830-default-rtdb.firebaseio.com",
  projectId: "linkedin-clone-24830",
  storageBucket: "linkedin-clone-24830.appspot.com",
  messagingSenderId: "1057766394323",
  appId: "1:1057766394323:web:4ba9b550afdb2e2b75c726",
  measurementId: "G-G9RVDFC7BN"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export {auth, provider, storage};
export default db;

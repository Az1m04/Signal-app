import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGQcpImPwI5hvAJSGXglvlCfIby8WB30Y",
  authDomain: "signal-clone-4c3b0.firebaseapp.com",
  projectId: "signal-clone-4c3b0",
  storageBucket: "signal-clone-4c3b0.appspot.com",
  messagingSenderId: "951907454292",
  appId: "1:951907454292:web:781d4d2336405ffa5f8cc1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

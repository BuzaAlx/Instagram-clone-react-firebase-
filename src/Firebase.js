import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAyUUqgOmavPtCjNS_R7HkMybLGFVCID5Q",
  authDomain: "social-484e8.firebaseapp.com",
  projectId: "social-484e8",
  storageBucket: "social-484e8.appspot.com",
  messagingSenderId: "517064410197",
  appId: "1:517064410197:web:e80cba609ef167702780dc",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

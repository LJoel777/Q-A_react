import * as firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBtESg8OPWI9ejfB3SBpDqXTn4xmtd0AWI",
  authDomain: "oi-mate-94113.firebaseapp.com",
  databaseURL: "https://oi-mate-94113.firebaseio.com",
  projectId: "oi-mate-94113",
  storageBucket: "oi-mate-94113.appspot.com",
  messagingSenderId: "903714279798",
  appId: "1:903714279798:web:0c1d7f5c9a45bbbfc9aa57",
});
const db = firebaseApp.firestore();

export { db };

import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  var config = {
    apiKey: "AIzaSyDttJzMyAZaAaocuNVgS_RcHCEZPdCibts",
    authDomain: "nuxtfire-news.firebaseapp.com",
    databaseURL: "https://nuxtfire-news.firebaseio.com",
    projectId: "nuxtfire-news",
    storageBucket: "nuxtfire-news.appspot.com",
    messagingSenderId: "759329082615"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({
    timestampsInSnapshots: true
  });
}

const db = firebase.firestore();

export default db;

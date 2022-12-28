import * as firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBcLm9aVuHqmKmIFBBQMQ5z2iOPE-mUj64",
    authDomain: "clone-twitter-8b6c0.firebaseapp.com",
    projectId: "clone-twitter-8b6c0",
    storageBucket: "clone-twitter-8b6c0.appspot.com",
    messagingSenderId: "815539687619",
    appId: "1:815539687619:web:3db6f428a84c3042e45276"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
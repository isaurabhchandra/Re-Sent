 import firebase from "firebase/app";
import 'firebase/auth';

import 'firebase/database';
import 'firebase/storage'
const config =  {
    apiKey: "AIzaSyAym1ai__rxCO_1NsDY9bEC1LgFB06Csag",
    authDomain: "resent-6d4fa.firebaseapp.com",
    databaseURL: "https://resent-6d4fa-default-rtdb.firebaseio.com",
    projectId: "resent-6d4fa",
    storageBucket: "resent-6d4fa.appspot.com",
    messagingSenderId: "955922840444",
    appId: "1:955922840444:web:849ac67feeac6d0f2bc2f9",
    measurementId: "G-0GFLS6L34D"
  };

  const app = firebase.initializeApp(config);
  export const auth = app.auth();
  export const database = app.database();
  export const storage = app.storage();
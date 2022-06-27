//import firebase from 'firebase/app'
//import { initializeApp } from "firebase/app";
//import 'firebase/firestore'
//import firebase from "firebase/compat/app";
//import firebase from 'firebase';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
//import { initializeApp } from 'firebase/app';


        import {
          getFirestore,
          /*collection,
          getDocs,
          onSnapshot,
          addDoc,
          deleteDoc,
          doc,
          getDoc,
          updateDoc,*/
        } //from "firebase/firestore";
        from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import { 
  getAuth, 
  /*createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut*/
} //from "firebase/auth";
from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';     

/*
if (!getApps().length) {
  initializeApp(JSON.parse(process.env.NEXT_PUBLIC_CLIENT));
}*/

const firebaseConfig = {
  apiKey: "AIzaSyAyX0Of0MNl6ORorUztAKfqiI5wFodoKXE",

  authDomain: "firestoreandroid-5aeb5.firebaseapp.com",

  projectId: "firestoreandroid-5aeb5",

  storageBucket: "firestoreandroid-5aeb5.appspot.com",

  messagingSenderId: "868798150099",

  appId: "1:868798150099:web:64f9de9bedeecc8a042b26"


};
// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const db = getFirestore(app);
//const auth = getAuth(app);
//export {auth,db}

//export default getFirestore();
//export const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);
//export const db = getFirestore(app);


const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth, db };

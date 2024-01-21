import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

import { doc, setDoc, getFirestore, getDoc, updateDoc, deleteDoc, deleteField,   addDoc, collection, onSnapshot, where, serverTimestamp,
  query, orderBy} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'



// Your web app's Firebase configuration
const firebaseConfig = {
  // ------------------ Most Secure Care ----------------

  apiKey: "AIzaSyDybQiGHOYnpneWXNwtorogM9iBH36bdSk",
  authDomain: "first-project-bc5c9.firebaseapp.com",
  projectId: "first-project-bc5c9",
  storageBucket: "first-project-bc5c9.appspot.com",
  messagingSenderId: "909768571949",
  appId: "1:909768571949:web:53b90da70de583133e8ca4"

  // ------------------ End ----------------------

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  googleProvider,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  // provider,
  facebookProvider,
  doc,
  setDoc,
  db,
  getDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  addDoc,
  collection,
  onSnapshot,
  where,
  serverTimestamp,
  query,
  orderBy,
}
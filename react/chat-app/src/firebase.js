// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUXW_iSlS3nNQfB1vwSF7cLnA465y9sbo",
  authDomain: "chatapp-a5a80.firebaseapp.com",
  projectId: "chatapp-a5a80",
  storageBucket: "chatapp-a5a80.appspot.com",
  messagingSenderId: "657437191760",
  appId: "1:657437191760:web:d311cf3fa94d4b01ba2b55",
  measurementId: "G-JXXD68S15X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { db, auth };


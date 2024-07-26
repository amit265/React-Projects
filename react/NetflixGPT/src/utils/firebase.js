// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "netflixgpt-5bd17.firebaseapp.com",
  projectId: "netflixgpt-5bd17",
  storageBucket: "netflixgpt-5bd17.appspot.com",
  messagingSenderId: "1088116558471",
  appId: "1:1088116558471:web:a1dc5b4ba2327b93258622",
  measurementId: "G-9QT7K4N717",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

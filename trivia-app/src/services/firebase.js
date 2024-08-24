import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyD7lSMsSVjSpwQ9GXcDggdK9qY6y0m3H_M",

  authDomain: "trivia-app-57966.firebaseapp.com",

  projectId: "trivia-app-57966",

  storageBucket: "trivia-app-57966.appspot.com",

  messagingSenderId: "307915995541",

  appId: "1:307915995541:web:7155ee5793787db6c89e9c",

  measurementId: "G-4TTM7EMEVT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    return setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithPopup(auth, provider);
    })
    .catch((error) => {
      console.error('Error setting persistence:', error);
    });
};

export { auth, signInWithGoogle };

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,

  authDomain: import.meta.env.VITE_AUTHDOMAIN,

  projectId: import.meta.env.VITE_PROJECTID,

  storageBucket: import.meta.env.VITE_STORAGEBUCKET,

  messagingSenderId: import.meta.env.VITE_MESSAGEID,

  appId: import.meta.env.VITE_APPID,

  measurementId: import.meta.env.VITE_MEASUREMENTID,
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
      console.error("Error setting persistence:", error);
    });
};

export { auth, signInWithGoogle };

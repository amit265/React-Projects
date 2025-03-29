import {
  getReactNativePersistence,
  initializeAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
// apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCjdRizjIhxuYhvDFgxcvgw_Wa0pFUpYog",
  authDomain: "trivia-quest-ai-5889f.firebaseapp.com",
  projectId: "trivia-quest-ai-5889f",
  storageBucket: "trivia-quest-ai-5889f.firebasestorage.app",
  messagingSenderId: "554813938546",
  appId: "1:554813938546:web:c7dfe4a645d082dceddbeb",
  measurementId: "G-C77R5ZNR8S"

  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth only once
let auth;
if (!global._firebaseAuth) {
  if (Platform.OS === "web") {
    // For web, use browserLocalPersistence
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Persistence set for web!");
      })
      .catch((error) => {
        console.log("Error setting persistence for web:", error);
      });

    // Check if Analytics is supported in the web environment
    isSupported().then((supported) => {
      if (supported) {
        const analytics = getAnalytics(app);
        console.log("Analytics initialized for web!");
      } else {
        console.log("Firebase Analytics is not supported in this environment.");
      }
    });
  } else {
    // For React Native, use initializeAuth with getReactNativePersistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    console.log("Persistence set for React Native!");
  }

  // Mark auth as initialized
  global._firebaseAuth = auth;
} else {
  auth = global._firebaseAuth;
}
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export { auth };

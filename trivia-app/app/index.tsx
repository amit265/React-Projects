import { GoogleAuthProvider, onAuthStateChanged, signInAnonymously, signInWithCredential } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebaseConfig";
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View, ActivityIndicator, Alert, Image, StyleSheet, ScrollView, Platform, Animated } from "react-native";
import Colors from "../constant/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dbUpdateContext, userDetailsContext, userQuizDataContext } from "@/context/userDetailsContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as AuthSession from 'expo-auth-session';
import SplashScreenComponent from "../components/Home/SplashScreens"

// WebBrowser.maybeCompleteAuthSession();
SplashScreen.preventAutoHideAsync();

export default function SignInScreen() {

  // const redirectUri =
  //   Platform.OS === "web"
  //     ? "https://auth.expo.io/@mindcraftlearning/trivia-app" // Web Redirect
  //     : AuthSession.makeRedirectUri({
  //       useProxy: true, // Disable proxy for standalone builds
  //     });

  // console.log("Generated Redirect URI:", redirectUri);
  // webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  // androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
  // iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "554813938546-cgvqtlvq1bui9ihh4r43g5rub4kfml3q.apps.googleusercontent.com",
    androidClientId: "554813938546-8goq0nl2tf9cavukltqkr9j7jcdl7snl.apps.googleusercontent.com",
    iosClientId: "554813938546-8lsuoam8v458gl9lm6n5fep13cchmjkk.apps.googleusercontent.com",
    responseType: Platform.OS === "web" ? "id_token" : "code",
    scopes: ["profile", "email", "openid"],
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: Platform.OS === "android" ? false : true, // Disable proxy for standalone builds      
      // useProxy: true // Try setting true for Android too


    })
  },
  )

  const { setUpdate } = useContext(dbUpdateContext);


  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userDetails, setUserDetails } = useContext(userDetailsContext);


  // console.log(process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID, process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID, process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await checkCachedUser(); // Load cached user if available
        // Load fonts, assets, etc.
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      }
      finally {
        await SplashScreen.hideAsync(); // ✅ Hide native splash immediately
      }
    }

    prepare();

    // ✅ Keep the splash for exactly 10 seconds no matter what
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.params?.id_token || response.params?.access_token; // Handle both cases
      if (idToken) {
        handleSignInWithGoogle(idToken);
      } else {
        Alert.alert("Sign-In Error", "No token received.");
      }
    }
  }, [response]);


  const checkCachedUser = async () => {
    setLoading(true);
    try {
      const cachedUser = await AsyncStorage.getItem("@auth_user");
      console.log("Cached User:", cachedUser); // Add this line to verify if data is being fetched properly

      if (cachedUser) {
        const userData = JSON.parse(cachedUser);
        setUserDetails(userData);
        router.replace("/(tabs)/home");

        // ✅ Skip Firestore update if cached data is found
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log("Error reading from cache:", error);
    }

    // ✅ If no cached user, fetch from Firestore
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const result = await getDoc(doc(db, "triviaUsers", user.email));
          if (result.exists()) {
            const firestoreUser = result.data();
            await AsyncStorage.setItem("@auth_user", JSON.stringify(firestoreUser));
            setUserDetails(firestoreUser);
            router.replace("/(tabs)/home");
          } else {
            console.log("User not found in Firestore");
          }
        } catch (error) {
          console.log("Error fetching user from Firestore:", error);
        }
      } else {
        console.log("No authenticated user");
      }

      setLoading(false);
    });
    return () => unsubscribe(); // ✅ Cleanup listener after fetching

  };






  async function handleSignInWithGoogle(idToken) {
    if (!idToken) {
      console.error("No ID token found in authentication response.");
      Alert.alert("Sign-In Error", "No ID token found.");
      return;
    }
    setLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      const userInfo = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      // **Immediately navigate to home screen**
      setUserDetails(userInfo);
      router.replace("/(tabs)/home");

      // **Run Firestore updates in the background**
      getUserDetails(user?.email, userInfo).then(async (userData) => {
        if (userData) {
          await AsyncStorage.setItem("@auth_user", JSON.stringify(userData));
          setUserDetails(userData);
        }
      });

    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert("Sign-In Failed", error?.message ?? "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }





  const getUserDetails = async (userEmail, user) => {
    try {
      if (!userEmail) {
        console.log("Email is undefined");
        return;
      }

      // console.log("user from home", user);


      const docRef = doc(db, "triviaUsers", userEmail);
      const result = await getDoc(docRef);

      if (!result.exists()) {
        console.log("User document does not exist. Creating a new one...");

        const newUserData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          member: false,
          createdAt: new Date(),
        };

        await setDoc(docRef, newUserData);
        return newUserData;

      } else {
        return result.data();
      }
    } catch (error) {
      console.log("Error fetching or creating user details:", error);
      return null;
    }
  };

  const guestLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;

      console.log("Guest User ID:", user.uid);

      const guestInfo = {
        uid: user.uid,
        displayName: "guest",
        email: "guest@gmail.com", // Anonymous users don't have emails
        photoURL: null,
        member: false,
        createdAt: new Date(),
      };


      setUserDetails(guestInfo);

      router.replace("/(tabs)/home");

      // Store guest data in Firestore
      await setDoc(doc(db, "triviaUsers", guestInfo.email), guestInfo);

      // Store in local state and cache
      await AsyncStorage.setItem("@auth_user", JSON.stringify(guestInfo));

    } catch (error) {
      console.error("Guest Sign-In Error:", error);
      Alert.alert("Guest Sign-In Failed", error.message);
    } finally {
      setLoading(false);
    }
  };


  if (showSplash) {
    return <SplashScreenComponent />
  }



  console.log("userdetails", userDetails);



  return (
    <ScrollView style={styles.container}>
      {loading && <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={styles.loadingText}>Logging in...</Text>
      </View>}
      <Image source={require("../assets/images/landing.png")} style={styles.image} loading="lazy" />


      <View style={styles.content}>
        <Text style={styles.title}>Trivia Quest AI: Learn & Conquer </Text>
        <Text style={styles.subtitle}>

          Join Trivia Quest! Challenge your brain with engaging quizzes, track your progress, and learn with detailed explanations.      </Text>

        <TouchableOpacity style={styles.button} onPress={() => promptAsync()}
          disabled={!request || loading}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <AntDesign name="google" size={24} color={Colors.BACKGROUND} />
            <Text style={[styles.buttonText, { color: Colors.BACKGROUND }]}>Sign in </Text>
          </View>
        </TouchableOpacity>



        <TouchableOpacity style={styles.button} onPress={guestLogin} disabled={loading}>

          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {/* <AntDesign name="google" size={24} color={Colors.BACKGROUND} /> */}
            <Text style={[styles.buttonText, { color: Colors.BACKGROUND }]}> Continue as Guest </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView >);
}



const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Optional overlay
    zIndex: 9999, // Make sure it overlays on top of other components
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  image: {
    width: "100%",
    height: 400,
  },
  content: {
    padding: 25,
    backgroundColor: Colors.BACKGROUND,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  title: {
    fontSize: 23,
    textAlign: "left",
    color: Colors.WHITE,
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 17,
    color: Colors.WHITE,
    marginTop: 5,
    textAlign: "left",
    fontFamily: "Poppins-Regular",

  },
  button: {
    padding: 15,
    backgroundColor: Colors.BUTTON,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },

  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND, // Adjust background color as needed
    position: "relative",
  },

  logo: {
    width: "100%", // Adjust width as needed
    height: "100%", // Adjust height as needed
    resizeMode: "contain", // Ensures it scales properly without cutting off
    alignSelf: "center", // Centers it horizontally
  },

  splashText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: "HomemadeApple-Regular",
    textAlign: "center",
  },
  loader: {
    position: "absolute",
    top: "50%", // Centering the loader
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

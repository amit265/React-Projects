import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import { useRouter } from "expo-router";
import {
  dbUpdateContext,
  leaderBoardDataContext,
  quizAttemptsContext,
  userDetailsContext,
  userQuizDataContext,
  userCreatedQuizContext,
  adConfigContext,
} from "../../context/userDetailsContext";
import QuizLists from "../../components/Quiz/QuizLists";
import UserProgress from "../../components/Home/UserProgress";
import showErrorAlert from "../utils/showErrorAlert";

export default function MainScreen() {
  const { userDetails } = useContext(userDetailsContext);
  const { userQuizList, setUserQuizList } = useContext(userQuizDataContext);
  const { quizAttempts, setQuizAttempts } = useContext(quizAttemptsContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { dbUpdate } = useContext(dbUpdateContext);
  const [totalQuizNumber, setTotalQuizNumber] = useState(0);
  const memoizedQuizzes = useMemo(() => userQuizList, [userQuizList]);
  const { leaderBoardData, setLeaderBoardData, userRank, setUserRank } =
    useContext(leaderBoardDataContext);
  const { userCreatedQuiz, setUserCreatedQuiz } = useContext(
    userCreatedQuizContext
  );
  const { adConfig, setAdConfig } = useContext(adConfigContext);

  useEffect(() => {
    let unsubscribe;

    const fetchAdSettings = () => {
      try {
        unsubscribe = onSnapshot(
          doc(db, 'config', 'adSettings'),
          (doc) => {
            if (doc.exists()) {
              console.log('Ad Config:', doc.data());
              setAdConfig(doc.data());
            }
          },
          (error) => {
            console.log('Error fetching ad settings:', error);
            // showErrorAlert('Failed to load ad settings.', fetchAdSettings);
          }
        );
      } catch (error) {
        console.log('Error setting up snapshot:', error);
        // showErrorAlert('An error occurred while setting up ad settings.', fetchAdSettings);
      }
    };

    fetchAdSettings();

    return () => {
      if (unsubscribe) unsubscribe(); // Clean up listener
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchQuizzes(),
          fetchAttemptedQuizzes(),
          getLeaderBoard(),
          getUserRank(),
        ]);
        console.log("Data fetched successfully");
        setDataLoaded(true); // ✅ Mark data as loaded
      } catch (error) {
        showErrorAlert(
          "Failed to load data. Please check your internet connection.",
          fetchData
        );
      }
    };

    fetchData();
  }, [userDetails?.email, dbUpdate]); // Ensure correct dependencies

  useEffect(() => {
    if (dataLoaded) {
      getUserCreatedQuiz();
    }
  }, [dataLoaded]); // ✅ Depend on dataLoaded state

  /** Fetch Quiz List from Firestore */
  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem("quizzes");
      if (storedData && !dbUpdate) {
        const quizzes = JSON.parse(storedData);
        setUserQuizList(quizzes);
        setTotalQuizNumber(quizzes?.length);
        setLoading(false);
        return;
      }

      const querySnapshot = await getDocs(query(collection(db, "Quizzes")));
      const quizzes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Save to AsyncStorage
      await AsyncStorage.setItem("quizzes", JSON.stringify(quizzes));

      setUserQuizList(quizzes);
      setTotalQuizNumber(quizzes?.length);
    } catch (error) {
      setLoading(false);
      showErrorAlert(
        "Failed to load data. Please check your internet connection.",
        fetchQuizzes
      );
    } 
  }, [dbUpdate]);

  /** Get User Created Quiz */
  const getUserCreatedQuiz = useCallback(async () => {
    console.log("getUserCreatedQuiz called");

    try {
      // ✅ Load from cache if available
      if (!userQuizList || userQuizList.length === 0) {
        console.log("No quizzes available, trying cache");

        const storedData = await AsyncStorage.getItem("userCreatedQuizzes");
        if (storedData) {
          console.log("Using cached userCreatedQuizzes");
          const userCreatedQuizzes = JSON.parse(storedData);

          if (userCreatedQuizzes?.length > 0) {
            setUserCreatedQuiz(userCreatedQuizzes);
            return; // ✅ Return early after successful cache load
          }
        } else {
          console.log("No cached quizzes found, trying to fetch from source");
        }
      }

      // ✅ Attempt to fetch directly from `userQuizList`
      if (userQuizList && userQuizList.length > 0) {
        const userCreatedQuizzes = userQuizList
          .filter((quiz) => quiz?.createdBy === userDetails?.email)
          .sort(
            (a, b) =>
              (b?.createdOn?.toMillis?.() || b?.createdOn || 0) -
              (a?.createdOn?.toMillis?.() || a?.createdOn || 0)
          );

        // console.log(
        //   "Filtered and sorted userCreatedQuserQuizListuizzes:",
        //   userCreatedQuizzes
        // );

        if (userCreatedQuizzes.length > 0) {
          await AsyncStorage.setItem(
            "userCreatedQuizzes",
            JSON.stringify(userCreatedQuizzes)
          );
          console.log("Stored quizzes in cache");
        }

        setUserCreatedQuiz(userCreatedQuizzes);
      } else {
        console.log("No user-created quizzes available yet");
      }
    } catch (error) {
      showErrorAlert(
        "Failed to load data. Please check your internet connection.",
        getUserCreatedQuiz
      );
    }
  }, [userQuizList, dbUpdate]);

  /** Get Leaderboard */
  const getLeaderBoard = useCallback(async () => {
    try {

      const storedData = await AsyncStorage.getItem("leaderBoardData");
      if (storedData && !dbUpdate) {
        const leaderBoard = JSON.parse(storedData);
        setLeaderBoardData(leaderBoard);
        return;
      }

      const usersRef = collection(db, "triviaUsers");
      const leaderboardQuery = query(usersRef, orderBy("totalScore", "desc"));
      const leaderboardSnapshot = await getDocs(leaderboardQuery);

      const filteredUsers = leaderboardSnapshot.docs
        .map((doc) => ({
          name: doc.data().displayName || "Unknown",
          email: doc.id,
          totalQuiz: doc.data().attemptedQuizzes?.length || 0,
          totalScore: doc.data().totalScore || 0,
        }))
        .filter(
          (user) =>
            user.email !== "aammiitt265@gmail.com" &&
            !user.email.includes("guest")
        );

      const leaderboard = filteredUsers.map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "leaderBoardData",
        JSON.stringify(leaderboard)
      );

      setLeaderBoardData(leaderboard);

      const userEntry = leaderboard.find(
        (user) => user?.email === userDetails?.email
      );
      // console.log("userEntry flsdjakfdsnjfdsnf", userEntry);
      // console.log("leaderboard", leaderboard);

      setUserRank(userEntry || null);
    } catch (error) {
      showErrorAlert(
        "Failed to load data. Please check your internet connection.",
        getLeaderBoard
      );
    }
  }, [dbUpdate, userDetails]);

  const getUserRank = useCallback(async () => {
    try {
      console.log("Fetching user rank...");

      // Check AsyncStorage first
      const storedData = await AsyncStorage.getItem("userEntry");
      if (storedData && !dbUpdate) {
        const userEntry = JSON.parse(storedData);
        // console.log(
        //   "userEntry from storage:",
        //   JSON.stringify(userEntry, null, 2)
        // );
        setUserRank(userEntry);
        return;
      }

      if (!leaderBoardData || !userDetails) {
        console.warn("leaderBoardData or userDetails is missing");
        return;
      }

      // Match user based on email (ignoring case)
      const userEntry = leaderBoardData.find(
        (user) =>
          user?.email?.toLowerCase() === userDetails?.email?.toLowerCase()
      );

      if (userEntry) {
        const completeUserEntry = {
          name: userEntry.name || "",
          rank: userEntry.rank || 0,
          totalQuiz: userEntry.totalQuiz || 0,
          totalScore: userEntry.totalScore || 0,
          ...userEntry,
        };

        // console.log(
        //   "Complete userEntry before saving:",
        //   JSON.stringify(completeUserEntry, null, 2)
        // );

        await AsyncStorage.removeItem("userEntry");
        await AsyncStorage.setItem(
          "userEntry",
          JSON.stringify(completeUserEntry)
        );
        setUserRank(completeUserEntry);
      } else {
        console.log("No matching userEntry found");
      }
    } catch (error) {
      showErrorAlert(
        "Failed to load data. Please check your internet connection.",
        getUserRank
      );
    }
  }, [leaderBoardData, userDetails, dbUpdate]);

  // console.log("userrank form home", userRank);

  /** Fetch Attempted Quizzes */
  const fetchAttemptedQuizzes = useCallback(async () => {
    if (!userDetails?.email) return;
    setLoading(true);
    try {
      const storedData = await AsyncStorage.getItem("attemptedQuizzes");
      if (storedData && !dbUpdate) {
        const quizzes = JSON.parse(storedData);
        setQuizAttempts(quizzes);
        setLoading(false);
        return;
      }

      const querySnapshot = await getDocs(
        query(
          collection(db, "quizAttempts"),
          where("userId", "==", userDetails?.email)
        )
      );
      const quizzes = querySnapshot.docs.map((doc) => doc.data());

      // Save to AsyncStorage
      await AsyncStorage.setItem("attemptedQuizzes", JSON.stringify(quizzes));

      setQuizAttempts(quizzes);
    } catch (error) {
      showErrorAlert(
        "Failed to load data. Please check your internet connection.",
        fetchAttemptedQuizzes
      );

      // console.log("Error fetching attempted quizzes:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [userDetails, dbUpdate]);

  /** Start Quiz Function */
  const randomQuiz = useMemo(() => {
    if (!userQuizList || userQuizList.length === 0) return null;
    return userQuizList[Math.floor(Math.random() * userQuizList.length)];
  }, [userQuizList]);

  const handleStartQuiz = () => {
    if (!userQuizList || userQuizList.length === 0) {
      console.warn("No quizzes available.");
      return;
    }

    router.push({
      pathname: `/quizView/${randomQuiz.id}`,
      params: { quizParam: JSON.stringify(randomQuiz.id) },
    });
  };

  /** Get Latest Quizzes */
  const latestQuizzes = useMemo(
    () =>
      [...(memoizedQuizzes || [])]
        .sort((a, b) => b.createdOn - a.createdOn)
        .slice(0, 10),
    [userQuizList]
  );

  console.log("userdetails", userDetails);


  if (!userDetails) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text>No user found</Text>
        <Button text="Go Back" onPress={() => router.push("/")} />
      </View>
    );
  }
  // console.log(
  //   "data from home for prpgress",
  //   totalQuizNumber,
  //   "userrank",
  //   userRank,
  //   "usercreatedquiz",
  //   userCreatedQuiz?.length
  // );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Welcome to Trivia Quest AI</Text>
          <Text style={styles.heroSubtitle}>
            Test your knowledge with AI-powered personalized trivia.
          </Text>

          {userRank &&
            userDetails?.displayName !== "guest" &&
            userQuizList?.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <UserProgress
                  totalQuizNumber={totalQuizNumber}
                  userRank={userRank}
                  userCreatedQuizNumber={userCreatedQuiz?.length}
                />
              </View>
            )}

          {/* Buttons */}

          {userQuizList?.length > 0 && userDetails?.displayName !== "guest" && (
            <View style={styles.buttonsContainer}>
              <Button
                text="Start Quiz"
                onPress={handleStartQuiz}
                style={styles.startQuizButton}
              />
              <Button
                text="Explore Existing Quizzes"
                // type="outline"
                onPress={() => router.push("/explore")}
              />
            </View>
          )}
        </View>

        {/* Features & Trending Quizzes */}
        <View style={styles.featuresSection}>
          <QuizLists
            quizList={latestQuizzes}
            heading="Trending Quizzes"
            color="blue"
          />
          {loading && (
            <View>
              <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
          )}

          <Text style={styles.featuresTitle}>Why You'll Love This App</Text>
          {[
            "🤖 Smarter Quizzes, Daily Challenges & Real-Time Leaderboards!",
            "📝 Test Your Knowledge with AI-Powered Trivia & Live Scores!",
            "🎯 Fun Daily Quizzes, Smarter Questions & Real-Time Competition!",
            "🏆 Create, Compete & Master Trivia with AI-Powered Quizzes!",
            "📚 Engaging Quizzes, Daily Challenges & Smarter Learning!",
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/** Styles */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? 45 : 10,
  },
  heroSection: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: Colors.WHITE,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.WHITE,
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "80%",
  },
  featuresSection: {
    marginTop: 30,
    padding: 16,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  featuresTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: Colors.BLACK,
    marginBottom: 5,
  },
  featureItem: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: "Poppins-Regular",
  },
  startQuizButton: {
    backgroundColor: Colors.BUTTON,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%", // Adjust button width for mobile and web
  },
});

import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../../constant/Colors";
import * as Progress from "react-native-progress";
import Button from "../../../components/Shared/Button";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import {
  dbUpdateContext,
  userDetailsContext,
  userQuizDataContext,
  quizCountContext,
  showConfettiContext,
  adConfigContext,
} from "../../../context/userDetailsContext";
import { showInterstitialAd } from "../../../components/Shared/AdManager";

export default function Quiz() {
  const { quizParam } = useLocalSearchParams();
  // console.log("courseparams form quiz geenrate", quizParam);
    const {adConfig} = useContext(adConfigContext);

  const quizId = JSON.parse(quizParam);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [result, setResult] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // const quiz = course?.quiz;
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState("");
  const { userDetails } = useContext(userDetailsContext);
  const { userQuizList } = useContext(userQuizDataContext);
  const { quizCount, setQuizCount } = useContext(quizCountContext);
  const { setUpdate } = useContext(dbUpdateContext);
  const { setShowConfetti } = useContext(showConfettiContext);
  const isGuest = userDetails?.displayName === "guest";
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const isPremium = userDetails?.member ?? false; // Ensure a boolean value
  // console.log(typeof userQuizList);

  console.log("quizCount", quizCount);

  useEffect(() => {
    if (quiz[currentPage]?.options) {
      setShuffledOptions(
        [...quiz[currentPage].options].sort(() => Math.random() - 0.5)
      );
    }
    const timer = setTimeout(() => {
      setAiLoading(true);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [currentPage]);

  const handleQuizCompletion = () => {
    setQuizCount((prevCount) => {
      const newCount = prevCount + 1;
      console.log("adConfig?.interstitialFrequency", adConfig?.interstitialFrequency);
      

      // Show an interstitial ad on 3rd and 4th attempt
      if (!isPremium && newCount % adConfig?.interstitialFrequency === 0) {
        showInterstitialAd(adConfig);
        console.log("showing interstitial ad");
      }

      return newCount;
    });
  };

  const singleQuiz = () =>
    Object.values(userQuizList).find((item) => item.docId === quizId);

  const course = singleQuiz();
  const quiz = course?.quiz;
  // console.log("quiz title", course?.quizTitle);

  // console.log("quiz data", quiz);

  const getProgress = (currentPage) => {
    const precentage = currentPage / quiz?.length;
    return precentage;
  };

  const onOptionSelect = (selectedChoice) => {
    setResult((prev) => ({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: quiz[currentPage]?.correctAns == selectedChoice,
        question: quiz[currentPage]?.question,
        correctAns: quiz[currentPage]?.correctAns,
        explanation: quiz[currentPage]?.explanation || "",
      },
    }));
  };

  const onQuizFinish = async () => {
    setLoading(true);
    try {
      const quizResultPercentage = calculateQuizPercent();
      // console.log("quiz perecnt", calculateQuizPercent());

      // await updateDoc(doc(db, "Quizzes", course?.docId), {
      //   quizResult: result,
      //   completedOn: Timestamp.now(),
      //   quizResultPercentage: quizResultPercentage,
      // });

      const userRef = doc(db, "triviaUsers", userDetails?.email);
      await updateDoc(userRef, {
        attemptedQuizzes: arrayUnion(course?.docId),
        scoreHistory: arrayUnion(Number(quizResultPercentage)), // Add new score
        totalScore: increment(Number(quizResultPercentage)), // Update total score
      });

      const attemptRef = doc(
        db,
        "quizAttempts",
        `${userDetails?.email}_${course?.docId}`
      );
      await setDoc(attemptRef, {
        quizTitle: course?.quizTitle,
        banner_image: course?.banner_image,
        userId: userDetails?.email, 
        quizId: course?.docId,
        score: quizResultPercentage,
        result: result, // Array of { question, userAnswer, correctAnswer }
        attemptedAt: Timestamp.now(),
      });

      setUpdate((prev) => !prev);

      setLoading(false);

      if (!isPremium) {
        handleQuizCompletion();
      }

      setShowConfetti(true),
        router.replace({
          pathname: "/quizResultScreen",
          params: {
            quizParam: JSON.stringify(quizId),
          },
        });
    } catch (error) {
      console.log(error);
    }
  };
  const calculateQuizPercent = () => {
    if (!quiz || !result) return 0;

    const correctAnswers = Object.values(result).filter(
      (q) => q.isCorrect
    ).length;
    const totalQuestions = quiz.length;

    return ((correctAnswers / totalQuestions) * 100).toFixed(0);
  };

  // const getAiHint = async (question) => {
  //   try {
  //     if (!question) return; // Prevents unnecessary API calls
  //     setAiLoading(true);

  //     const prompt =
  //       "You are a trivia master. Please provide a hint for the question below that encourages the user to think critically, but do not reveal the answer directly. The hint should be in 1-2 sentences and guide the user to analyze the question and options: " +
  //       question;

  //     const aiResponse = await generateAiHint.sendMessage(prompt);

  //     if (aiResponse?.response?.candidates) {
  //       const hintText =
  //         aiResponse.response.candidates[0]?.content?.parts[0]?.text;

  //       let hint;
  //       try {
  //         hint = JSON.parse(hintText);
  //       } catch (error) {
  //         console.error("Failed to parse hint text:", hintText);
  //         hint = { hint: hintText }; // Fallback to raw text
  //       }

  //       setAiHint(hint);
  //     } else {
  //       console.error("Unexpected AI response format:", aiResponse);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setAiLoading(false); // Ensures loading stops even if there's an error
  //   }
  // };

  const goBack = () => {
    if (Platform.OS === "web") {
      if (
        window.confirm(
          "Are you sure you want to go back? You will lose your progress."
        )
      ) {
        router.back();
      }
    } else {
      Alert.alert(
        "Confirm Exit",
        "Are you sure you want to go back? You will lose your progress.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "OK",
            style: "destructive",
            onPress: () => router.back(),
          },
        ]
      );
    }
  };

  if (!quiz) {
    return <ActivityIndicator size="large" color={Colors.WHITE} />;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Pressable onPress={goBack}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>

        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 25,
            color: Colors.WHITE,
          }}
        >
          {currentPage + 1} / {quiz?.length}
        </Text>
      </View>

      <Text
        style={{
          textAlign: "center",
          fontFamily: "Poppins-Regular",
          fontSize: 18,
          padding: 10,
          color: Colors.WHITE,
        }}
      >
        {course?.quizTitle}
      </Text>
      <View style={{ marginTop: 10, alignSelf: "center" }}>
        <Progress.Bar
          progress={getProgress(currentPage)}
          width={Dimensions.get("window").width * 0.85}
          color={Colors.WHITE}
          height={8}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 25,
          paddingVertical: 20,
          backgroundColor: Colors.WHITE,
          marginTop: 20,
          elevation: 1,
          borderRadius: 20,
          flexGrow: 1,
          paddingBottom: 100,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          {quiz[currentPage]?.question}
        </Text>
        {shuffledOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedOption(index);
              onOptionSelect(item);
            }}
            style={{
              padding: 20,
              borderWidth: 1,
              borderRadius: 15,
              marginTop: 8,
              backgroundColor:
                selectedOption == index ? Colors.LIGHT_GREEN : null,
              borderColor: selectedOption == index ? Colors.GREEN : null,
            }}
          >
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 17 }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
        {/* <View style={styles.hintContainer}>
            {!aiHint?.hint && !aiLoading && (
              <Pressable
                style={styles.hintButton}
                onPress={() => getAiHint(quiz[currentPage]?.question)}
              >
                <Image
                  source={require("../../../assets/images/intelligence.png")}
                  style={styles.hintIcon}
                />
                <Text style={styles.hintText}>Get hint</Text>
              </Pressable>
            )}

            {aiLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
              </View>
            )}

            {aiHint?.hint && !aiLoading && (
              <View style={styles.hintBox}>
                <Text style={styles.hintMessage}>{aiHint?.hint}</Text>
              </View>
            )}
          </View> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingTop: 10,
            marginTop: "10",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {aiLoading && (
            <Pressable
              style={styles.hintButton}
              onPress={() => setAiHint((prev) => !prev)}
            >
              <Image
                source={require("../../../assets/images/bulb.png")}
                style={styles.hintIcon}
                loading="lazy"
              />
              <Text style={styles.hintText}>Get hint</Text>
            </Pressable>
          )}
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            {aiHint && (
              <Text
                style={{
                  textAlign: "left",
                  flexWrap: "wrap",
                  flexShrink: 1,
                  fontFamily: "Poppins-Regular",
                  fontSize: 11,
                  color: "#333",
                }}
              >
                {quiz[currentPage]?.explanation}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        {selectedOption?.toString() && quiz?.length - 1 > currentPage && (
          <Button
            text={"Next"}
            onPress={() => {
              setAiHint(false);
              setAiLoading(false);
              setCurrentPage(currentPage + 1);
              setSelectedOption(null);
            }}
          />
        )}
        {selectedOption?.toString() && quiz?.length - 1 == currentPage && (
          <Button
            text={"Finish"}
            onPress={() => {
              setAiHint(false);
              setAiLoading(false);
              onQuizFinish();
            }}
            loading={loading}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hintContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional overlay
    zIndex: 9999, // Make sure it overlays on top of other components
  },
  hintButton: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
  },
  hintIcon: {
    height: 40,
    width: 40,
  },
  hintText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    marginTop: 5,
    color: "#333",
  },
  hintBox: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    minHeight: 20,
    justifyContent: "center",
  },
  hintMessage: {
    fontSize: 13,
    color: "#444",
  },
});

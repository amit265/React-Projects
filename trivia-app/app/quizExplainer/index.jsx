import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { generateAiHint } from "../../config/aiModel";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import Prompt from "../../constant/Prompt";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  adConfigContext,
  dbUpdateContext,
  stopAppOpenAdContext,
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import Button from "../../components/Shared/Button";
import UpgradeAlert from "../../components/Home/UpgradeAlert";
import {
  BannerAdComponent,
  showRewardedAd,
} from "../../components/Shared/AdManager";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export default function QuizExplainer() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState();
      const {adConfig} = useContext(adConfigContext);
  
  const router = useRouter();
  const [adWatched, setAdWatched] = useState(false); // Track ad watch status
  const { userDetails } = useContext(userDetailsContext);
  const [isUpgradeVisible, setUpgradeVisible] = useState(false);
  const isPremium = userDetails?.member;
  const { isAdAvailable, setIsAdAvailable, setStopAppOpenAd } =
    useContext(stopAppOpenAdContext);
  // Safely parse question parameters
  const { questionParams, quizIdParams, questionNumberParams } =
    useLocalSearchParams();
  const questions = questionParams ? JSON.parse(questionParams) : null;
  const quizId = quizIdParams ? quizIdParams : null;
  const [showError, setShowError] = useState(false);
  // console.log("isadaviailbe from add quiz", isAdAvailable);
  // console.log("questionNumberParams", questionNumberParams);

  // console.log("quizid from explainer", quizId);
  // const selectedquiz = userQuizList.filter((quiz) => quiz?.id === quizId);
  // console.log("quizid", quizId);
  // console.log("selected quiz", JSON.stringify(selectedquiz, null, 2));

  useEffect(() => {
    console.log("isAdAvailable updated from add quiz:", isAdAvailable);
  }, [isAdAvailable]);

  useEffect(() => {
    if (adWatched && questions) {
      getAiExplainer(questions);
    }
  }, [adWatched]);

  const handleUpgradeAlert = async () => {
    setUpgradeVisible(true);
  };

  const handleUpgrade = () => {
    router.replace("/subscription");
    setUpgradeVisible(false);
  };

  const handleWatchAd = async () => {
    if (!isAdAvailable) {
      Alert.alert("Ad Not Available", "Please try again later.");
      setUpgradeVisible(false);

      return;
    }
    const rewardEarned = await handleWatchAds(); // Show ad directly here
    if (rewardEarned) {
      console.log("User earned the reward!");
      setAdWatched(true);
    }
    setUpgradeVisible(false);
  };

  const handleClose = () => {
    setUpgradeVisible(false);
  };

  const handleWatchAds = async () => {
    try {
      const rewardEarned = await showRewardedAd({
        isAdAvailable,
        setIsAdAvailable,
        adConfig
      });

      console.log("rewardEarned", rewardEarned);

      if (rewardEarned) {
        setStopAppOpenAd(true);

        console.log("User earned the reward!");
        // ✅ Grant reward here (e.g., allow more quizzes)
        setAdWatched(true); // Allow quiz creation
        return true;
      } else {
        setStopAppOpenAd(true);

        console.log("User closed the ad without earning the reward.");
        setAdWatched(false); // Deny quiz creation
        setIsAdAvailable(false);
        return false;
      }
    } catch (error) {
      setStopAppOpenAd(true);

      console.error("Error showing ad:", error);
      setAdWatched(false); // Deny quiz creation
      setIsAdAvailable(false);
      return false;
    } finally {
      setUpgradeVisible(false);
    }
  };

  const getAiExplainer = async (question) => {
    try {
      if (!isPremium && !adWatched) {
        const shouldContinue = await handleUpgradeAlert(); // 🔹 Wait for user choice
        if (!shouldContinue) return; // ❌ Stop execution if user cancels or upgrades
      }

      setAiLoading(true);

      const userChoiceString =
        "question: " +
        question?.question +
        "Correct answer" +
        question?.correctAns +
        "User Answer: " +
        question?.userChoice;

      const prompt = Prompt.EXPLAIN + userChoiceString;

      const aiResponse = await generateAiHint.sendMessage(prompt);

      if (aiResponse?.response?.candidates) {
        const hintText =
          aiResponse.response.candidates[0]?.content?.parts[0]?.text;
        let hint;
        try {
          hint = JSON.parse(hintText);
        } catch (error) {
          setShowError(true);
          hint = [
            {
              explanation: {
                question: "Error",
                answer: "Parsing failed",
                detailedExplanation: hintText,
              },
            },
          ];
        }

        setAiHint(hint?.detailedExplanation);

        // try {
        //   if (quizId && questionNumberParams) {
        //     const questionRef = doc(db, "quizzes", quizId);

        //     // If the document exists, update it; otherwise, create it
        //     await setDoc(
        //       questionRef,
        //       {
        //         [`quiz.${questionNumberParams}.detailedExplanation`]:
        //           hint?.detailedExplanation,
        //       }
        //       // Merge so that existing fields aren't overwritten
        //     );
        //     setUpdate((prev) => !prev);
        //     console.log("Detailed explanation saved to Firebase");
        //   }
        // } catch (error) {
        //   console.log("error from database", error);
        // }
      } else {
        setShowError(true);

        console.error("Unexpected AI response format:", aiResponse);
      }
    } catch (error) {
      setShowError(true);

      console.error("AI explainer error:", error);
    } finally {
      setAiLoading(false);
      setShowError(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
   
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={35} color="white" />
          </Pressable>
        </View>
        <Text style={styles.heading}>Question Explainer</Text>

        <View style={styles.explanationContainer}>
          <Text style={styles.questionText}>
            Question: {questions?.question}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 15,
              color: !questions.isCorrect ? Colors.RED : Colors.PRIMARY,
            }}
          >
            Your Answer: {questions?.userChoice}
          </Text>
          <Text style={styles.answerText}>
            Correct Answer: {questions?.correctAns}
          </Text>
          <Text style={styles.explanationText}>
            Explanation: {questions?.explanation}
          </Text>

          <Button
            text={"Get Detailed Explanantion"}
            onPress={() => getAiExplainer(questions)}
            loading={aiLoading}
            type="fill"
            disable={aiHint ? true : false}
          />
        </View>

        {aiLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.WHITE}
            style={styles.loader}
          />
        ) : aiHint ? (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>{aiHint}</Text>
          </View>
        ) : (
          ""
        )}

        {showError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>AI Request Limit Reached</Text>
            <Text style={styles.errorMessage}>
              You have reached the maximum number of AI requests for now. Please
              come again tomorrow or explore other quizzes.
            </Text>
          </View>
        )}
        {isUpgradeVisible && (
          <UpgradeAlert
            isVisible={isUpgradeVisible}
            onUpgrade={handleUpgrade}
            onWatchAd={handleWatchAd}
            onClose={handleClose}
          />
        )}
      </ScrollView>

      <View
        style={{ alignItems: "center", backgroundColor: Colors.BACKGROUND }}
      >
        {!isPremium && <BannerAdComponent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.BACKGROUND,
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    top: 20,
    left: 20,
    zIndex: 10,
  },
  heading: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 15,
    color: Colors.WHITE,
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
  explanationContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 15,
  },
  questionText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#333",
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
    color: "#007bff",
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
  },
  errorContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: Colors.WHITE,
  },
  errorMessage: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.WHITE,
    marginTop: 5,
  },
});

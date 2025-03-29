import { View, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constant/Colors";
import * as Progress from "react-native-progress";
import LottieView from "lottie-react-native";
export default function UserProgress({
  totalQuizNumber,
  userRank,
  userCreatedQuizNumber,
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [progressQuiz, setProgressQuiz] = useState(0);

  useEffect(() => {
    if (totalQuiz === nextChallenge - 1) {
      setShowConfetti(true);
    }
  }, []);


  useEffect(() => {
    if (totalQuiz && nextChallenge) {
      setProgressQuiz(totalQuiz / nextChallenge);
    }
  }, [totalQuizNumber, nextChallenge]);

  if (!userRank)
    return (
      <View>
        <ActivityIndicator size="large" color={Colors.WHITE} />
      </View>
    );

  const { name, rank, totalQuiz, totalScore } = userRank;
  const maxScore = totalQuizNumber * 100;

  // Assign user levels based on quiz attempts
  const getQuizLevel = (attempts) => {
    if (attempts === 0)
      return {
        title: "📖 New Explorer",
        message: "Start your first quiz today!",
      };
    if (attempts < 5)
      return {
        title: "🌟 Quiz Enthusiast",
        message: "You're getting started! Keep going!",
      };
    if (attempts < 10)
      return {
        title: "🔥 Quiz Challenger",
        message: "Great work! You're gaining momentum!",
      };
    return {
      title: "🏆 Quiz Master",
      message: "You're at the top! Keep dominating!",
    };
  };

  // Assign badges based on progress
  const getBadge = (attempts) => {
    if (attempts < 3)
      return { icon: "medal", color: "#CD7F32", title: "Bronze Explorer" };
    if (attempts < 7)
      return { icon: "medal", color: "#C0C0C0", title: "Silver Achiever" };
    if (attempts < 12)
      return { icon: "medal", color: "#FFD700", title: "Gold Champion" };
    return { icon: "star-circle", color: "#4B0082", title: "Platinum Legend" };
  };

  // Challenge targets (example: 5, 10, 25, 50, etc.)
  const challenges = [5, 10, 25, 50, 75, 100];
  const nextChallenge = challenges.find((c) => c > totalQuiz) || totalQuiz + 10;
  console.log("total quiz", progressQuiz); 

  // Motivation messages
  const getMotivationMessage = (attempts, bestScore) => {
    if (attempts === 0) return "Start your first quiz and unlock your journey!";
    // if (bestScore > 80) return "🔥 You're a top performer! Keep going!";
    if (attempts > 10) return "You're building momentum! Keep it up!";
    return "Every quiz makes you better! Never stop learning. 🚀";
  };

  const quizLevel = getQuizLevel(totalQuiz);
  const userBadge = getBadge(totalQuiz);

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
      }}
    >
      {/* Confetti Animation on Level-Up */}
      {showConfetti && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0, // Covers the entire screen
            zIndex: 999,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LottieView
            source={require("../../assets/fun.json")}
            autoPlay
            loop={false} // Run only once
            onAnimationFinish={() => setShowConfetti(false)} // Hide after finishing
            style={{
              width: "100%",
              height: "100%",
              transform: [{ translateY: -100 }],
            }} // Covers the whole screen
          />
        </View>
      )}

      {/* Welcome Message */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 5 }}>
        👋 Hey {name}!
      </Text>
      <Text style={{ fontSize: 16, color: "#555" }}>
        You're on an exciting quiz journey! 🚀
      </Text>

      {/* Rank Section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <FontAwesome5 name="trophy" size={18} color="gold" />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 8 }}>
          Rank: #{rank}
        </Text>
      </View>

      {/* Badge Display */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#EAF2F8",
          marginVertical: 10,
        }}
      >
        <MaterialCommunityIcons
          name={userBadge.icon}
          size={30}
          color={userBadge.color}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
          {userBadge.title}
        </Text>
      </View>

      {/* Quiz Level & Encouragement */}
      <View
        style={{
          marginVertical: 10,
          alignItems: "center",
          padding: 12,
          borderRadius: 10,
          backgroundColor: "#FFDF80",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {quizLevel.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#333",
            textAlign: "center",
            marginTop: 5,
          }}
        >
          {quizLevel.message}
        </Text>
      </View>

      {/* Quiz Progress Bar */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>
        Your Progress
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Progress.Bar
          progress={progressQuiz}
          width={200}
          color="#36A2EB"
          style={{ marginVertical: 10 }}
        />
        <Text>
          {totalQuiz} / {nextChallenge}
        </Text>
      </View>
      {/* Quiz Stats */}
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16 }}>
          📚 Quizzes Attempted:{" "}
          <Text style={{ fontWeight: "bold", color: "#36A2EB" }}>
            {totalQuiz}
          </Text>
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          📝 Created Quizzes:{" "}
          <Text style={{ fontWeight: "bold", color: "#FF6384" }}>
            {userCreatedQuizNumber}
          </Text>
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          🔥 Total Score:{" "}
          <Text style={{ fontWeight: "bold", color: "#F39C12" }}>
            {totalScore}
          </Text>
        </Text>
        {/* <Text style={{ fontSize: 16, marginTop: 5 }}>
          🏅 Best Score:{" "}
          <Text style={{ fontWeight: "bold", color: "#27AE60" }}>
            {bestScore}
          </Text>
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          🔥 Streak:{" "}
          <Text style={{ fontWeight: "bold", color: "#E74C3C" }}>
            {streak} days
          </Text>
        </Text> */}
      </View>

      {/* Next Goal Encouragement */}
      <View
        style={{
          marginTop: 15,
          padding: 10,
          backgroundColor: "#D4EDDA",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: "#2E8B57",
          }}
        >
          🎯 Goal: Reach {nextChallenge} quizzes to level up!
        </Text>
      </View>
    </View>
  );
}

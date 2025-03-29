import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";

import {
  quizAttemptsContext,
  showConfettiContext,
  userDetailsContext,
} from "../../context/userDetailsContext";
import { BannerAdComponent } from "../../components/Shared/AdManager";

export default function QuizSummary() {
  const { quizParam } = useLocalSearchParams();
  const quizId = JSON.parse(quizParam);
  const { quizAttempts } = useContext(quizAttemptsContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userDetails } = useContext(userDetailsContext);
  const [displayConfetti, setDisplayConfetti] = useState(false);
  const isPremium = userDetails?.member;
  const { showConfetti, setShowConfetti } = useContext(showConfettiContext);
  // console.log("quiz id from result screen", quizId);

  const quizzes = useMemo(() => {
    return Object.values(quizAttempts).find((item) => item.quizId == quizId);
  }, [quizAttempts, quizId]);

  const quizResult = quizzes?.result || {};

  useEffect(() => {
    if (!quizzes) {
      setLoading(true);
    }

    if (
      quizzes &&
      Object.keys(quizzes.result || {}).length > 0 &&
      getPercMarks() > 60 &&
      showConfetti
    ) {
      setTimeout(() => setDisplayConfetti(true), 1000); // Small delay to ensure proper rendering
    }
  }, [quizzes]);

  const { correctAns, totalQuestion } = useMemo(() => {
    if (!quizzes?.result) return { correctAns: 0, totalQuestion: 0 };

    const correctAns_ = Object.entries(quizzes.result)?.filter(
      ([, value]) => value?.isCorrect === true
    );

    return {
      correctAns: correctAns_.length,
      totalQuestion: Object.keys(quizzes.result).length,
    };
  }, [quizzes]);

  const getPercMarks = () => {
    return totalQuestion > 0
      ? ((correctAns / totalQuestion) * 100).toFixed(0)
      : 0;
  };
  const renderItem = ({ item, index }) => {
    const quizItem = item[1];
    const questionNumber = item[0];

    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          router.push({
            pathname: "/quizExplainer/",
            params: {
              questionParams: JSON.stringify(quizItem),
              quizIdParams: quizId,
              questionNumberParams: questionNumber,
            },
          })
        }
        style={{
          padding: 15,
          borderWidth: 1,
          marginHorizontal: 30,
          marginTop: 5,
          borderRadius: 15,
          backgroundColor: quizItem?.isCorrect
            ? Colors.LIGHT_GREEN
            : Colors.LIGHT_RED,
          borderColor: quizItem?.isCorrect
            ? Colors.LIGHT_GREEN
            : Colors.LIGHT_RED,
        }}
      >
        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
          {quizItem?.question}
        </Text>
        {!quizItem?.isCorrect && (
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 15,
              color: Colors.RED,
            }}
          >
            Your Answer: {quizItem?.userChoice}
          </Text>
        )}
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 15,
            color: Colors.GREEN,
          }}
        >
          {!quizItem?.isCorrect ? "Correct Answer" : "Answer"}:{" "}
          {quizItem?.correctAns}
        </Text>
        {quizItem?.explanation && (
          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 16,
              color: Colors.GRAY,
            }}
          >
            {quizItem?.explanation}
          </Text>
        )}
        <View>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/quizExplainer/",
                params: {
                  questionParams: JSON.stringify(quizItem),
                  quizIdParams: JSON.stringify(quizzes?.quizId),
                },
              })
            }
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 15,
                color: Colors.PRIMARY,
                paddingTop: 5,
              }}
            >
              Click for more
            </Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      {displayConfetti && (
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
            onAnimationFinish={() => {
              setShowConfetti(false);
              setDisplayConfetti(false);
            }} // Hide after finishing
            style={{
              width: "100%",
              height: "100%",
              transform: [{ translateY: -100 }],
            }} // Covers the whole screen
          />
        </View>
      )}
      <FlatList
        data={quizResult ? Object.entries(quizResult) : []}
        renderItem={renderItem}
        style={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <View>
            <View style={{ paddingHorizontal: 20, paddingTop: 25 }}>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 28,
                  color: Colors.WHITE,
                  left: 30,
                }}
              >
                Quiz Summary
              </Text>
              <View
                style={{
                  position: "absolute",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  top: 30,
                  left: 10,
                }}
              >
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={30} color="white" />
                </Pressable>
              </View>
            </View>
            {quizzes?.result ? (
              <View style={{ width: "100%", padding: 35 }}>
                <View
                  style={{
                    backgroundColor: Colors.WHITE,
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 60,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/images/trophy.png")}
                    style={{ width: 100, height: 100, marginTop: -60 }}
                  />
                  <Text style={{ fontSize: 26, fontFamily: "Poppins-Bold" }}>
                    {getPercMarks() > 60 ? "Congratulations" : "Try Again!"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Poppins-Regular",
                      color: Colors.GRAY,
                      fontSize: 17,
                    }}
                  >
                    You gave {getPercMarks()}% correct answer
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      gap: 5,
                      borderRadius: 5,
                      backgroundColor: Colors.WHITE,
                      elevation: 1,
                    }}
                  >
                    <View style={styles.resultTextContainer}>
                      <Text style={styles.resultText}>Q {totalQuestion}</Text>
                    </View>
                    <View style={styles.resultTextContainer}>
                      <Text style={styles.resultText}>✅ {correctAns} </Text>
                    </View>
                    <View style={styles.resultTextContainer}>
                      <Text style={styles.resultText}>
                        ❌ {totalQuestion - correctAns}
                      </Text>
                    </View>
                  </View>
                </View>

                <Button
                  text={"Back to Home"}
                  onPress={() => router.replace("/(tabs)/home")}
                />
                <Button
                  text={"Attempt Again"}
                  onPress={() =>
                    router.push({
                      pathname: "/quizView/" + quizId,
                      params: { quizParam: JSON.stringify(quizId) },
                    })
                  }
                />
                <View style={{ marginTop: 25 }}>
                  <Text
                    style={{
                      fontFamily: "Poppins-Bold",
                      fontSize: 25,
                      color: Colors.WHITE,
                      textAlign: "center",
                    }}
                  >
                    Summary
                  </Text>
                </View>
              </View>
            ) : (
              <ActivityIndicator
                size={"large"}
                color={Colors.WHITE}
                style={{ top: "60%" }}
              />
            )}
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View
        style={{ alignItems: "center", backgroundColor: Colors.BACKGROUND }}
      >
        {!isPremium && <BannerAdComponent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
  },
  resultTextContainer: {
    padding: 7,
  },
});

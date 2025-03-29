import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  Touchable,
  StyleSheet,
} from "react-native";
import React, { useContext, useMemo } from "react";
import Colors from "../../constant/Colors";
import {
  quizAttemptsContext,
  userDetailsContext,
  userQuizDataContext,
  dbUpdateContext
} from "../../context/userDetailsContext";
import QuizHistory from "../../components/Quiz/QuizHistory";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { BannerAdComponent } from "../../components/Shared/AdManager";

export default function quizHistory() {
  const screenWidth = Dimensions.get("screen").width;
  const { quizAttempts } = useContext(quizAttemptsContext);
  const {userDetails} = useContext(userDetailsContext);
  const isPremium = userDetails?.member;
  const { dbUpdate } = useContext(dbUpdateContext);

  // console.log("quizAttempts", quizAttempts);



  const router = useRouter();

  

  // if (latestQuiz.length === 0) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: Colors.BACKGROUND,
  //       }}
  //     >
  //       <Pressable onPress={() => router.push("/explore")}>
  //         <Text style={{ color: Colors.WHITE, fontSize: 16 }}>
  //           No Quiz Attempted yet
  //         </Text>
  //       </Pressable>
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[]} // Empty data since content is in ListHeaderComponent
        style={{ flex: 1, backgroundColor: Colors.BACKGROUND, paddingBottom: 20 }}
        ListHeaderComponent={
          <View style={{ flex: 1, paddingBottom: 10 }}>
            {/* Page Header */}
            <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 28,
                  color: Colors.WHITE,
                  left: 30,
                }}
              >
                Quiz History
              </Text>
              <View
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  top: 25,
                  left: 10,
                }}
              >
                <Pressable onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={30} color="white" />
                </Pressable>
              </View>
            </View>

            {/* Course List */}

            {quizAttempts.length > 0 ? (
              <View
                style={{
                  width: screenWidth * 0.9,
                  alignSelf: "center",
                  backgroundColor: Colors.BACKGROUND,
                  borderRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 3,
                }}
              >
                <QuizHistory quizAttempts={quizAttempts}  />
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.BACKGROUND,
                }}
              >
                <Pressable onPress={() => router.push("/explore")}>
                  <Text style={{ color: Colors.WHITE, fontSize: 16 }}>
                    No Quiz Attempted yet
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        }
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
  adContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});

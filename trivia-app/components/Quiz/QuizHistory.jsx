import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { imageAssets } from "../../constant/Option";
import Colors from "../../constant/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatTimestamp } from "../../constant/Constants";
import { dbUpdateContext } from "../../context/userDetailsContext";
export default function QuizHistory({ quizAttempts, heading = "" }) {
  const router = useRouter();
  const [latestAttemptedQuiz, setLatestAttemptedQuiz] = useState([]);
  const screenWidth = Dimensions.get("screen").width;
  const { dbUpdate } = useContext(dbUpdateContext);

  console.log("quizhistory from componetn", quizAttempts.length);

  const latestQuiz = useMemo(() => {
    if (!Array.isArray(quizAttempts) || quizAttempts.length === 0) return [];

    return [...quizAttempts]
      .filter((item) => item?.attemptedAt)
      .sort(
        (a, b) =>
          b.attemptedAt.seconds - a.attemptedAt.seconds ||
          b.attemptedAt.nanoseconds - a.attemptedAt.nanoseconds
      );
  }, [quizAttempts, dbUpdate]);

  console.log("attemptedAt type:", quizAttempts[0]?.attemptedAt);

  return (
    <View
      style={{
        backgroundColor: Colors.BACKGROUND,
        width: screenWidth * 0.9,
        alignContent: "center",
        margin: "auto",
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 16,
          textAlign: "center",
          padding: 10,
          color: Colors.WHITE,
        }}
      >
        {heading}
      </Text>

      <FlatList
        data={latestQuiz}
        keyExtractor={(item, index) => `${item?.quizId}-${index}`}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={20} // ✅ Increased initial render count
        windowSize={10} // ✅ Increased window size for better performance
        maxToRenderPerBatch={20} // ✅ Increased to accommodate more items
        removeClippedSubviews={false} // ✅ Prevent items from disappearing
        getItemLayout={(data, index) => ({
          length: 120, // ✅ Approximate height including padding and margin
          offset: 120 * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/quizResultScreen",
                params: {
                  quizParam: JSON.stringify(item?.quizId),
                },
              })
            }
            key={index}
            style={styles.courseContainer}
          >
            <View style={styles.itemContent}>
              <View style={styles.imageContainer}>
                <Ionicons
                  name="checkmark-circle"
                  size={30}
                  color={Colors.GREEN}
                  style={styles.iconContainer}
                />
                <Image
                  source={imageAssets[item?.banner_image]}
                  style={styles.image}
                  loading="lazy"
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.quizTitle}>{item?.quizTitle}</Text>
                <View style={styles.subTextContainer}>
                  {/* <AntDesign name="book" size={24} color="black" /> */}

                  <Text
                    style={{ color: "gray", fontFamily: "Poppins-Regular" }}
                  >
                    {formatTimestamp(item?.attemptedAt)}
                  </Text>

                  <View
                    style={{
                      alignSelf: "flex-end",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <AntDesign
                      name="checksquare"
                      size={24}
                      color={item?.score > 60 ? "green" : "red"}
                    />

                    <Text
                      style={{
                        fontWeight: "bold",
                        color: item?.score > 60 ? "green" : "red",
                      }}
                    >
                      {item?.score} %
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    margin: 6,
    borderRadius: 15,
  },
  itemContent: {
    flexDirection: "row", // Set items to be in a row
    alignItems: "center",
  },
  image: {
    width: 100, // Set image width
    height: 100, // Set image height
    borderRadius: 15,
  },
  textContainer: {
    marginLeft: 10, // Space between image and text
    flex: 1, // Allow text container to take available space
  },
  iconContainer: {
    position: "absolute",
    top: -10, // Adjust this value to position the icon above the image
    left: "50%",
    transform: [{ translateX: -15 }], // Center the icon horizontally
    backgroundColor: Colors.BACKGROUND, // Optional: Adds background for better visibility
    borderRadius: 50, // Optional: Makes it look better
    padding: 2, // Optional: Adds spacing
  },

  quizTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginTop: 10,
  },
  subTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  },
  imageContainer: {
    position: "relative", // Ensures child elements position correctly
    width: 100, // Match image width
    height: 100, // Match image height
  },
  iconContainer: {
    position: "absolute",
    top: "30%", // Adjust this value to control how much overlap occurs
    left: "50%",
    transform: [{ translateX: -15 }], // Center the icon horizontally
    zIndex: 10, // Ensures the icon appears above the image
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

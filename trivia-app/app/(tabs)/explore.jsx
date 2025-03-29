import {
  View,
  Text,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useMemo, useCallback } from "react";
import Colors from "../../constant/Colors";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";
import {
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

export default function Explore() {
  const { userQuizList } = useContext(userQuizDataContext);
  const { userDetails } = useContext(userDetailsContext);
  const router = useRouter();
  const isGuest = userDetails?.displayName === "guest";

  const memoizedQuizList = useMemo(() => userQuizList, [userQuizList]);
  const MemoisedCourseListByCategory = useMemo(
    () => <CourseListByCategory userQuizList={memoizedQuizList} />,
    [memoizedQuizList]
  );

  const renderHeader = useCallback(() => (
    <View style={{ flex: 1 }}>
      {/* Page Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
        <Text style={styles.headerText}>Explore More Quizzes</Text>
      </View>

      {/* Course List */}
      <View style={styles.courseListContainer}>
        {MemoisedCourseListByCategory}
      </View>
    </View>
  ), [MemoisedCourseListByCategory]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}
        data={[]} // Empty data since content is in ListHeaderComponent
        removeClippedSubviews={true} // ✅ Improves performance
        initialNumToRender={10} // ✅ Render only first 5 items initially
        maxToRenderPerBatch={10} // ✅ Limits the number of items rendered at once
        updateCellsBatchingPeriod={50} // ✅ Smooth scrolling performance
        windowSize={10} // ✅ Limits the number of offscreen items preserved
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={renderHeader}
      />
        

      {/* Blur View for Guest Users */}
      {isGuest && (
        <BlurView intensity={30} style={styles.blurOverlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>Sign in to access content</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: Colors.WHITE,
  },
  adContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  courseListContainer: {
    paddingHorizontal: 5,
    paddingBottom: 20,
    width: Dimensions.get("screen").width,
    alignSelf: "center",
    backgroundColor: Colors.BACKGROUND,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
  },
  blurOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  overlayContent: {
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  overlayText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: Colors.WHITE,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.BUTTON,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: Colors.BACKGROUND,
  },
});

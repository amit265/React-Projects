import {
  View,
  Text,
  Platform,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  quizAttemptsContext,
  userCreatedQuizContext,
  userDetailsContext,
  userQuizDataContext,
} from "../../context/userDetailsContext";
import Colors from "../../constant/Colors";
import QuizLists from "../../components/Quiz/QuizLists";
import QuizHistory from "../../components/Quiz/QuizHistory";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import NoQuiz from "../../components/Quiz/NoQuiz";
import CourseListByCategory from "../../components/Explore/CourseListByCategory";

export default function QuizScreen() {
  const { userDetails } = useContext(userDetailsContext);
  const { userQuizList } = useContext(userQuizDataContext);
  const { quizAttempts } = useContext(quizAttemptsContext);
  const isGuest = userDetails?.displayName === "guest";
  const router = useRouter();
  const { userCreatedQuiz } = useContext(userCreatedQuizContext);
  const [loading, setLoading] = useState(true);
  const [latestQuizzes, setLatestQuizzes] = useState([]);
  const [quizByCategory, setQuizByCategory] = useState({});
  const latestQuiz = useMemo(() => {
    if (!Array.isArray(quizAttempts) || quizAttempts?.length === 0) return [];
    return [...quizAttempts].sort((a, b) => b?.attemptedAt - a?.attemptedAt);
  }, [quizAttempts]);
  
  useEffect(() => {
    if (userDetails && userQuizList) {
      getQuizList();
    }
  }, [userDetails, userQuizList]);

  const getQuizList = useCallback(() => {
    setLoading(true);
    if (
      !Array.isArray(userQuizList) ||
      userQuizList.length === 0 ||
      !userDetails
    ) {
      setLatestQuizzes([]);
      setQuizByCategory({});
      setLoading(false);
      return;
    }

    const latest5 = userCreatedQuiz.slice(0, 5);
    setLatestQuizzes(latest5);

    // const remainingQuizzes = userCreatedQuiz.slice(5);
    const groupedQuizzes = userCreatedQuiz.reduce((acc, quiz) => {
      const category = quiz?.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(quiz);
      return acc;
    }, {});

    setQuizByCategory(groupedQuizzes);
    setLoading(false);
  }, [userQuizList, userDetails, userCreatedQuiz]);


  const memoizedQuizList = useMemo(() => userCreatedQuiz, [userCreatedQuiz]);

  const MemoisedCourseListByCategory = useMemo(
    () => <CourseListByCategory userQuizList={userCreatedQuiz} />,
    [memoizedQuizList]
  );

 
  return (
    <View style={{ flex: 1 }}>
      {isGuest && (
        <BlurView intensity={30} style={styles.fullScreenBlur}>
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
      <FlatList
        style={{
          flex: 1,
          backgroundColor: Colors.BACKGROUND,
          paddingBottom: 20,
        }}
        data={[]} // Convert object to array
        keyExtractor={(item, index) => item[0] || index.toString()}
        onRefresh={getQuizList}
        refreshing={loading}
        removeClippedSubviews={true} // ✅ Improves performance
        initialNumToRender={10} // ✅ Render only first 5 items initially
        maxToRenderPerBatch={10} // ✅ Limits the number of items rendered at once
        updateCellsBatchingPeriod={50} // ✅ Smooth scrolling performance
        windowSize={10} // Renders only visible items
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: Colors.BACKGROUND,
              paddingTop: Platform.OS === "ios" ? 45 : 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 30,
                color: Colors.WHITE,
                paddingLeft: 20,
              }}
            >
              Your Quizzes
            </Text>

            {/* Page Header */}
            <View
              style={{
                backgroundColor: Colors.BACKGROUND,
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                height: "100%",
              }}
            >
              {/* Latest Quizzes Section */}
              {latestQuizzes.length > 0 ? (
                <View
                  style={{
                    paddingHorizontal: 20,
                  }}
                >
                  <QuizLists quizList={latestQuizzes} heading="Latest Quiz" />
                </View>
              ) : (
                <NoQuiz />
              )}

              {
                <View style={styles.courseListContainer}>
                  {MemoisedCourseListByCategory}
                </View>
              }

              {latestQuiz.length > 0 && (
                <View
                  style={{
                    marginTop: 30,
                    alignSelf: "center",
                    borderRadius: 15,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 3,
                    backgroundColor: Colors.BACKGROUND,
                  }}
                >
                  <QuizHistory
                    quizAttempts={latestQuiz}
                    heading="Attempted Quizzes"
                  />
                </View>
              )}
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenBlur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
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
});

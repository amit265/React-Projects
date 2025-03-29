import { View, Text, FlatList } from "react-native";
import React, { useMemo } from "react";
import QuizList from "../Quiz/QuizList";
import Colors from "../../constant/Colors";

export default function CourseListByCategory({ userQuizList }) {
  // 🟢 useMemo ensures quizzes are grouped only when userQuizList changes
  const quizByCategory = useMemo(() => {
    if (!userQuizList || userQuizList.length === 0) return {};

    return userQuizList.reduce((acc, quiz) => {
      const category = quiz.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(quiz);
      return acc;
    }, {});
  }, [userQuizList]);

  // console.log("Grouped Quizzes by Category:", quizByCategory);

  return (
    <View>
      {Object.keys(quizByCategory).length > 0 ? (
        <FlatList
          data={Object.entries(quizByCategory)} // Convert object into an array [category, quizzes]
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => {
            const [category, quizzes] = item;
            return (
              <View key={category} style={{ marginBottom: 20 }}>
                <QuizList heading={category} quizList={quizzes} />
              </View>
            );
          }}
        />
      ) : (
        <Text>No quizzes found</Text>
      )}
    </View>
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../store/quizSlice";
import { setAllQuestions } from "../store/categorySlice";

const useFetchQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.quiz.questions);

  useEffect(() => {
    // Only fetch questions if the array is empty
    const fetchQuestions = async () => {
      if (questions.length === 0) {
        try {
          const response = await fetch(
            "https://coderespite.com/api/trivia-questions.json"
          );
          const data = await response.json();
          dispatch(setQuestions(data));
          dispatch(setAllQuestions(data));
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();  // Call the function
  }, [dispatch, questions.length]);

  return questions;
};

export default useFetchQuestions;

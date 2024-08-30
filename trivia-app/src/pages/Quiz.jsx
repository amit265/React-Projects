import React from "react";
import { useSelector, useDispatch } from "react-redux";
import QuizCard from "../components/quiz/QuizCard";
import ProgressBar from "../components/quiz/ProgressBar";
import {
  setCorrectAnswer,
  setCurrentQuestionIndex,
  setIsAnswerCorrect,
  setIsAnswerSubmitted,
  setUserAnswer,
  setUserScore,
} from "../store/quizSlice";
import { setFeedBack } from "../store/uiSlice";
import UserScore from "../components/quiz/UserScore";
import LifeLine from "../components/quiz/LifeLine";
import Feedback from "../components/quiz/Feedback";
import { setAiHint } from "../store/lifeLine";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Quiz = () => {
  const navigate = useNavigate();
  const questions = useSelector((store) => store.quiz.questions);
  console.log("questions", questions.length);
  const currentQuestionIndex = useSelector(
    (store) => store.quiz.currentQuestionIndex
  );
  const dispatch = useDispatch();
  const userAnswer = useSelector((store) => store.quiz.userAnswer);
  const userScore = useSelector((store) => store.quiz.userScore);
  const isAnswerSubmitted = useSelector(
    (store) => store.quiz.isAnswerSubmitted
  );
  const handleAnswerSubmit = () => {
    const isAnswerCorrect =
      questions[currentQuestionIndex].correct_answer === userAnswer;
    dispatch(setCorrectAnswer(questions[currentQuestionIndex].correct_answer));
    dispatch(setIsAnswerCorrect(isAnswerCorrect));
    dispatch(setIsAnswerSubmitted(true));
    dispatch(setAiHint(""));
    console.log(isAnswerCorrect);
    if (isAnswerCorrect) {
      dispatch(setUserScore(userScore + 10));
      dispatch(setFeedBack("correct"));
    } else {
      dispatch(
        setFeedBack(
          "wrong! Correct answer is " +
            questions[currentQuestionIndex].correct_answer
        )
      );
      dispatch(setUserScore(userScore - 5));
    }

    setTimeout(() => {
      dispatch(setFeedBack(""));
      dispatch(setCorrectAnswer(null));
      dispatch(setIsAnswerCorrect(null));
      dispatch(setUserAnswer(null));
      dispatch(setIsAnswerSubmitted(false));
      if (currentQuestionIndex < questions.length - 1) {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      } else {
        alert(
          `Quiz complete! Your score: ${
            isAnswerCorrect ? userScore + 10 : userScore - 5
          }/${questions.length * 10}`
        );

        navigate(BASE_URL + "/quiz");
      }
    }, 2000);
  };

  if (!questions.length) {
    return <div>Loading...</div>; // Handle the case where questions are still loading
  }

  return (
    <div className="container max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
      <UserScore />
      <ProgressBar />
      <LifeLine />
      <QuizCard />
      <button
        onClick={handleAnswerSubmit}
        disabled={!userAnswer || isAnswerSubmitted}
        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 cursor-pointer"
      >
        Submit Answer
      </button>
      <Feedback />
    </div>
  );
};

export default Quiz;

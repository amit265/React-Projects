import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAnswer } from "../../store/quizSlice";

const QuestionOptions = () => {
  const dispatch = useDispatch();
  const removeIncorrectAnswer = useSelector(
    (store) => store.quiz.removeIncorrectAnswer
  );
  const options = useSelector((store) => store.quiz.currentQuestionOption);
  const correctAnswer = useSelector((store) => store.quiz.correctAnswer);
  const userAnswer = useSelector((store) => store.quiz.userAnswer);
  const isAnswerSubmitted = useSelector(
    (store) => store.quiz.isAnswerSubmitted
  );
  console.log("isAnswerSubmitted", isAnswerSubmitted);
  console.log("userAnswer", userAnswer);
  console.log("correctAnswer", correctAnswer);
  const handleOptionSelect = (option) => {
    console.log("Selected option:", option);
    dispatch(setUserAnswer(option));
  };
  return (
    <div className="mt-4">
      {options.map((option, i) => (
        <div key={option + i}>
          <button
            disabled={removeIncorrectAnswer.find(
              (incorrectOption) => incorrectOption === option
            )}
            className={`block w-full text-left p-2 mb-2 rounded cursor-pointer ${
              isAnswerSubmitted
                ? option === correctAnswer
                  ? "bg-green-500 text-white animate-pulse transition ease-in-out duration-75"
                  : option === userAnswer
                  ? "bg-red-500 text-white animate-pulse transition ease-in-out duration-100"
                  : "bg-gray-100"
                : userAnswer === option
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            } hover:bg-blue-100 transition duration-200`}
            onClick={() => handleOptionSelect(option)}
          >
            <h1
              className={`${
                removeIncorrectAnswer.length > 0 &&
                removeIncorrectAnswer.find(
                  (incorrectOption) => incorrectOption === option
                )
                  ? "transition ease-linear duration-400 line-through decoration-red-600 decoration-solid decoration-2	"
                  : ""
              }`}
            

            >
              {option}
            </h1>
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionOptions;

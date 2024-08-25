import { useState, useEffect } from "react";
import { fetchQuestions } from "../services/api";
import { shuffleArray } from "../services/shuffleArray";
import LogoutButton from "../components/LogoutButton";

const Game = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      // console.log(shuffleArray(fetchedQuestions));
      setQuestions(shuffleArray(fetchedQuestions.filter(game => game.category === category)).slice(0, 10));
    };

    loadQuestions();
  }, []);
  if (questions.length === 0) return <div>Loading...</div>;

  // console.log(feedback);

  const handleAnswerSubmit = () => {
    const isAnswerCotrrect =
      selectedAnswer === questions[currentQuestion].correct_answer;
    setIsSubmitted(true);
    setCorrectAnswer(questions[currentQuestion].correct_answer);
    if (isAnswerCotrrect) {
      setScore(prevScore => prevScore + 10);
      setFeedback("Correct!");
    } else {
      setFeedback(
        "Wrong! Correct answer is " + questions[currentQuestion].correct_answer
      );
      setScore(prevScore => prevScore - 5);
    }
    // console.log(score);

    setTimeout(() => {
      setFeedback("");
      setSelectedAnswer("");
      setIsSubmitted(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert(`Quiz complete! Your score: ${isAnswerCotrrect ? score + 10 : score - 5 }/${questions.length * 10}`);
        setCurrentQuestion(0);
        setScore(0);
      }
    }, 1000); // Move to next question after 2 seconds
  };

  const handleOptionSelect = (option) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {currentQuestion + 1}. {questions[currentQuestion].question}
        </h2>
        <div className="mb-4">
          {questions[currentQuestion].options.map((option) => (
            <button
              id="q-option"
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`block w-full text-left p-2 mb-2 rounded ${
                isSubmitted
                  ? option === correct_answer
                    ? "bg-green-500 text-white"
                    : option === selectedAnswer
                    ? "bg-red-500 text-white"
                    : "bg-gray-100"
                  : selectedAnswer === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              } hover:bg-blue-100 transition duration-200`}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleAnswerSubmit}
          disabled={!selectedAnswer || isSubmitted}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Submit Answer
        </button>
        <div>
          Score: {score}/{questions.length * 10}
        </div>
        {feedback && (
          <div
            className={`mt-4 text-lg font-semibold ${
              feedback === "Correct!" ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;

import { useState, useEffect } from "react";
import useFetchQuestions from "../services/useFetchQuestions";
import openai from "../utils/openai";
import { shuffleArray } from "../services/shuffleArray";
import ReactLoading from "react-loading";

const Game = ({ category, setCategory, allQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [hint, setHint] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]); // Add state for filtered options
  const [loading, setLoading] = useState(false);
  const [isEliminateUsed, setIsEliminateUsed] = useState(false); // Track if 50-50 is used
  const [isAiHintUsed, setIsAiHintUsed] = useState(false); // Track if 50-50 is used
  const [showLifelines, setShowLifelines] = useState(false); // State to control visibility of lifelines\\\
  const [removeIncorrectAnswer, setRemoveIncorrectAnswer] = useState([]);
  const [isskipQuestionUsed, setIsskipQuestionUsed] = useState(false); //
  useFetchQuestions();

  useEffect(() => {
    const loadQuestions = async () => {
      setQuestions(
        shuffleArray(
          allQuestions.filter((game) => game.category === category)
        ).slice(0, 10)
      );
    };

    loadQuestions();
  }, [category]); // added category as dependency

  useEffect(() => {
    // Reset filtered options when the question changes
    if (questions.length > 0) {
      setFilteredOptions(questions[currentQuestion].options);
      setShowLifelines(false); // Hide lifelines initially
      // setIsEliminateUsed(false);
      // setIsAiHintUsed(false);

      setRemoveIncorrectAnswer([]);
      setCorrectAnswer("");

      setShowLifelines(true); // Show lifelines after 10 seconds

    }
  }, [currentQuestion, questions]);

  if (questions?.length === 0)
    return (
      <div className="flex justify-center items-center">
        {" "}
        <ReactLoading
          type={"spin"}
          color={"blue"}
          height={"100px"}
          width={"100px"}
        />
      </div>
    );
  const handleAnswerSubmit = () => {
    const isAnswerCorrect =
      selectedAnswer === questions[currentQuestion].correct_answer;
    setIsSubmitted(true);
    setCorrectAnswer(questions[currentQuestion].correct_answer);
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 10);
      setFeedback("Correct!");
    } else {
      setFeedback(
        "Wrong! Correct answer is " + questions[currentQuestion].correct_answer
      );
      setScore((prevScore) => prevScore - 5);
    }

    setTimeout(() => {
      setFeedback("");
      setHint("");

      setSelectedAnswer("");
      setIsSubmitted(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert(
          `Quiz complete! Your score: ${
            isAnswerCorrect ? score + 10 : score - 5
          }/${questions.length * 10}`
        );
        setCategory("");
        setCurrentQuestion(0);
        setScore(0);
      }
    }, 2000); // Move to next question after 3 seconds
  };

  const handleOptionSelect = (option) => {
    if (!isSubmitted) {
      setSelectedAnswer(option);
    }
  };

  const aiHint = async (question) => {
    if (isAiHintUsed) return; // Prevent re-execution if already used
    setIsAiHintUsed(true);

    const gptQuery =
      "You are a trivia master. Please provide a hint for the question below that encourages the user to think critically, but do not reveal the answer directly. The hint should be in 1-2 sentences and guide the user to analyze the question and options: " +
      question;

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptResult = gptResults.choices?.[0]?.message?.content.trim();

      if (!gptResult) {
        throw new Error("No hint received from the AI");
      }
      setHint(gptResult);
    } catch (error) {
      console.error("Error fetching hint:", error.message);
    }
    setLoading(false);
  };

  const eliminate = () => {
    if (isEliminateUsed) return; // Prevent re-execution if already used
    setIsEliminateUsed(true);

    const correctAnswer = questions[currentQuestion].correct_answer;
    let incorrectOptions = questions[currentQuestion].options.filter(
      (option) => option !== correctAnswer
    );

    // Randomly remove two incorrect options
    if (incorrectOptions.length > 2) {
      incorrectOptions = shuffleArray(incorrectOptions).slice(0, 2);
      console.log(incorrectOptions);
    }

    setRemoveIncorrectAnswer(incorrectOptions);
    // setFilteredOptions([...incorrectOptions, correctAnswer]);
  };

  const skipQuestion = () => {
    setIsskipQuestionUsed(true);

    if (isskipQuestionUsed) return; // Prevent re execution
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz complete! Your score: ${score}/${questions.length * 10}`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  // console.log(loading);

  console.log("removeIncorrectAnswer", removeIncorrectAnswer, correct_answer);

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">
          {currentQuestion + 1}. {questions[currentQuestion].question}
        </h2>

        {showLifelines && (
          <div className="flex justify-between text-sm sm:text-base">
            {/* <h2 className={`align-middle p-1 m-1 ${lifeline > 0 ? "text-green-600" : "text-red-600 text-center"} font-semibold`}>
              {`${lifeline > 0 ? `use lifeline - ${lifeline}` : "No lifelines available"}`}
            </h2> */}
            <div className="flex justify-center gap-4 mx-auto min-w-full">
              <h2
                className={`p-1 m-1 w-1/4 text-center bg-green-400 rounded-lg cursor-pointer ${
                  isskipQuestionUsed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={skipQuestion}
              >
                skip
              </h2>

              <h2
                className={`p-1 m-1 w-1/4 text-center bg-green-400 rounded-lg cursor-pointer ${
                  isEliminateUsed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={eliminate}
              >
                50-50
              </h2>
              <h2
                className={`p-1 m-1 w-1/4 text-center bg-green-400 rounded-lg cursor-pointer ${
                  isAiHintUsed ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => {
                  aiHint(questions[currentQuestion].question);
                  setLoading(true);
                }}
              >
                ask minion
              </h2>
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center">
            <ReactLoading
              type={"spin"}
              color={"blue"}
              height={"50px"}
              width={"50px"}
            />
          </div>
        ) : (
          <div>
            {hint && (
              <div>
                <h2 className="text-base text-green-600 font-semibold">
                  {hint}
                </h2>
              </div>
            )}
          </div>
        )}
        <div className="mb-4">
          {filteredOptions.map((option) => (
            <button
              id="q-option"
              key={option}
              onClick={() => handleOptionSelect(option)}
              className={`block w-full text-left p-2 mb-2 rounded ${
                isSubmitted
                  ? option === correct_answer
                    ? "bg-green-500 text-white animate-pulse transition ease-in-out duration-75"
                    : option === selectedAnswer
                    ? "bg-red-500 text-white animate-pulse transition ease-in-out duration-100"
                    : "bg-gray-100"
                  : selectedAnswer === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              } hover:bg-blue-100 transition duration-200`}
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
          ))}
        </div>
        <button
          onClick={handleAnswerSubmit}
          disabled={!selectedAnswer || isSubmitted}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Submit Answer
        </button>
        <div className="py-4">
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
      <div className="text-center cursor-pointer">
        <h2
          className="p-4 m-4 bg-pink-400 mx-auto max-w-md rounded-md "
          onClick={() => {
            if (confirm("Are you sure?")) {
              setCategory("");
            }
          }}
        >
          category
        </h2>
      </div>
    </div>
  );
};

export default Game;

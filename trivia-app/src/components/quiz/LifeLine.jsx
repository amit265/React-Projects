import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAiHint,
  setIsAiHintUsed,
  setIsEliminateUsed,
  setIsSkipUsed,
  setLoading,
} from "../../store/lifeLine";
import {
  setCurrentQuestionIndex,
  setRemoveIncorrectAnswer,
  setUserScore,
} from "../../store/quizSlice";
import openai from "../../utils/openai";
import ReactLoading from "react-loading";
import { shuffleArray } from "../../services/shuffleArray";
import ai_icon from "../../assets/images/ai.png";
import magic_icon from "../../assets/images/magic.png";
import skip_icon from "../../assets/images/skip_next.png";

const LifeLine = () => {
  const dispatch = useDispatch();
  const hintByAi = useSelector((store) => store.lifeLine.aiHint);
  console.log("hintByAi", hintByAi);
  const isAiHintUsed = useSelector((store) => store.lifeLine.isAiHintUsed);
  const isSkipUsed = useSelector((store) => store.lifeLine.isSkipUsed);
  const isEliminateUsed = useSelector(
    (store) => store.lifeLine.isEliminateUsed
  );
  const loading = useSelector((store) => store.lifeLine.isLoading);
  const currentQuestionIndex = useSelector(
    (store) => store.quiz.currentQuestionIndex
  );
  const questions = useSelector((store) => store.quiz.questions);
  const userScore = useSelector((store) => store.quiz.userScore);
  const question = questions[currentQuestionIndex].question;

  console.log("isAiHintUsed", isAiHintUsed, isSkipUsed, isEliminateUsed);

  const eliminate = () => {
    dispatch(setIsEliminateUsed(true));
    if (isEliminateUsed) {
      return;
    }

    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    let incorrectOptions = questions[currentQuestionIndex].options.filter(
      (option) => option !== correctAnswer
    );
    console.log(incorrectOptions, correctAnswer);
    // Randomly remove two incorrect options
    if (incorrectOptions.length > 2) {
      incorrectOptions = shuffleArray(incorrectOptions).slice(0, 2);
      console.log("incorrectOptions", incorrectOptions, correctAnswer);
    }
    dispatch(setRemoveIncorrectAnswer(incorrectOptions));
  };

  const aiHint = async () => {
    dispatch(setIsAiHintUsed(true));
    if (isAiHintUsed) return;
    const gptQuery =
      "You are a trivia master. Please provide a hint for the question below that encourages the user to think critically, but do not reveal the answer directly. The hint should be in 1-2 sentences and guide the user to analyze the question and options: " +
      question;

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const gptResult = gptResults.choices?.[0]?.message?.content.trim();
      console.log("gptResult", gptResult);
      if (!gptResult) {
        throw new Error("No hint received from the AI");
      }
      dispatch(setAiHint(gptResult));
    } catch (error) {
      console.error("Error fetching hint:", error.message);
    }
    dispatch(setLoading(false));
  };

  const skipQuestion = () => {
    dispatch(setIsSkipUsed(true));
    if (isSkipUsed) return;
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      alert(`Quiz complete! Your score: ${userScore}/${questions.length * 10}`);
      dispatch(setCurrentQuestionIndex(0));
      dispatch(setUserScore(0));
    }
  };
  return (
    <div>
      <div className="flex justify-between text-sm sm:text-base mt-4">
        {/* <h2 className={`align-middle p-1 m-1 ${lifeline > 0 ? "text-green-600" : "text-red-600 text-center"} font-semibold`}>
              {`${lifeline > 0 ? `use lifeline - ${lifeline}` : "No lifelines available"}`}
            </h2> */}
        <div className="flex justify-center gap-4 mx-auto min-w-full">
          <h2
            className={`p-1 m-1 w-1/4 text-center text-sm bg-[#ffcc01] rounded-lg cursor-pointer ${
              isSkipUsed ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={skipQuestion}
          >
            <span>
              <img src={skip_icon} alt="" className="inline" />
            </span>
            skip
          </h2>

          <h2
            className={`p-1 m-1 w-1/4 text-center text-sm bg-[#ffcc01] rounded-lg cursor-pointer ${
              isEliminateUsed ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={eliminate}
          >
            <span>
              <img src={magic_icon} alt="" className="inline mr-1" />
            </span>
            50-50
          </h2>
          <h2
            className={`p-1 m-1 w-1/4 text-center text-sm bg-[#ffcc01] rounded-lg cursor-pointer ${
              isAiHintUsed ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              aiHint();
              dispatch(setLoading(true));
            }}
          >
            <span>
              <img src={ai_icon} alt="" className="inline mr-1" />
            </span>
            hint by AI
          </h2>
        </div>
      </div>

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
          {hintByAi && (
            <div>
              <h2 className="p-4 text-base text-green-600 font-semibold">
                {hintByAi}
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LifeLine;

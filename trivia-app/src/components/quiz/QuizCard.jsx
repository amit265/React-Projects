import React from 'react';
import Question from './Question';
import QuestionOptions from "./QuestionOptions";

const QuizCard = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <Question/>
      <QuestionOptions/> 
    </div>
  );
};

export default QuizCard;

import React from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
  const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex);
  const totalQuestions = useSelector((store) => store.quiz.questions.length);
  const progress = (currentQuestionIndex  / (totalQuestions)) * 100;
  return (
    <div className="w-full mb-1">
      <div
        className="bg-red-500 h-1 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

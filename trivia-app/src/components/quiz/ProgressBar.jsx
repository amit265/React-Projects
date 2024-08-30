import React from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = () => {
  const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex);
  const totalQuestions = useSelector((store) => store.quiz.questions.length);
  const progress = (currentQuestionIndex  / (totalQuestions)) * 100;
  return (
    <div className="w-full bg-gray-200 h-2 mb-4">
      <div
        className="bg-blue-500 h-2"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

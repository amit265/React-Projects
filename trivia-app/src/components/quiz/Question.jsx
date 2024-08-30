import React from 'react';
import { setCurrentQuestionOption } from '../../store/quizSlice';
import { useDispatch, useSelector } from 'react-redux';

const Question = () => {
  const dispatch = useDispatch();

  const currentQuestionIndex = useSelector((store) => store.quiz.currentQuestionIndex);
  const questions = useSelector((store) => store.quiz.questions);
  console.log("questions from questions amit", questions);
  const question = questions[currentQuestionIndex];
  dispatch(setCurrentQuestionOption(question.options));

  return (
    <div>
      <h2 className="text-xl font-bold">{`${currentQuestionIndex + 1}. ${question.question}`}</h2>
    </div>
  );
};

export default Question;

import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    userAnswer: null,
    correctAnswer: null,
    isAnswerCorrect: null,
    currentQuestionOption: [],
    isAnswerSubmitted: false,
    removeIncorrectAnswer: [],
    userScore: 0,
    totalScore: [],
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },

    setUserAnswer: (state, action) => {
      state.userAnswer = action.payload;
    },

    setUserScore: (state, action) => {
      state.userScore = action.payload;
    },
    setCorrectAnswer: (state, action) => {
      state.correctAnswer = action.payload;
    },
    setIsAnswerCorrect: (state, action) => {
      state.isAnswerCorrect = action.payload;
    },
    setCurrentQuestionOption: (state, action) => {
      state.currentQuestionOption = action.payload;
    },
    setIsAnswerSubmitted: (state, action) => {
        state.isAnswerSubmitted = action.payload;
    },
    setRemoveIncorrectAnswer: (state, action) => {
        state.removeIncorrectAnswer = action.payload;
    },
    setTotalScore: (state, action) => {
      state.totalScore.push(action.payload);
    },
    resetQuiz: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.userAnswer = null;
      state.correctAnswer = null;
      state.isAnswerCorrect = null;
      state.currentQuestionOption = [];
      state.isAnswerSubmitted = false;
      state.removeIncorrectAnswer = [];
      state.userScore = 0;
      // state.totalScore = [];
  
    }
      
  },
});

export const {
  setQuestions,
  setCurrentQuestionIndex,
  setUserAnswer,
  setUserScore,
  setCorrectAnswer,
  setIsAnswerCorrect,
  setCurrentQuestionOption,
  setIsAnswerSubmitted,
  setRemoveIncorrectAnswer,
  setTotalScore,
  resetQuiz
} = quizSlice.actions;

export default quizSlice.reducer;

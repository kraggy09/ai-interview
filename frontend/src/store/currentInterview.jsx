import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentQuestion: 0,
  totalQuestion: 15,
};

const currentInterviewSlice = createSlice({
  name: "currentInterview",
  initialState,
  reducers: {
    getNextQuestion: (state) => {
      if (state.currentQuestion < state.totalQuestion) {
        state.currentQuestion += 1;
      }
    },
    setAnswers: (state, action) => {
      const { questionId, ans } = action.payload;
      const updatedQuestions = state.questions.map((ques) =>
        ques._id === questionId ? { ...ques, ans } : ques
      );
      state.questions = updatedQuestions;
    },
    setQuestions: (state, action) => {
      const { questions, totalQuestion } = action.payload;
      state.questions = questions;
      state.totalQuestion = totalQuestion;
    },
  },
});

export const { getNextQuestion, setAnswers, setQuestions } =
  currentInterviewSlice.actions;

export default currentInterviewSlice.reducer;

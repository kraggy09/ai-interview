import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  currentQuestion: 0,
  totalQuestion: 15,
  interviewId: "",
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
      const { quest, ans } = action.payload;
      console.log(action.payload);

      const updatedQuestions = state.questions.map((ques) =>
        ques.question === quest ? { ...ques, ans } : ques
      );
      state.questions = updatedQuestions;
    },
    setQuestions: (state, action) => {
      const { questions, totalQuestion, id } = action.payload;
      state.questions = questions;
      state.totalQuestion = totalQuestion;
      state.interviewId = id;
    },
    clearInterview: (state) => {
      state.questions = [];
      state.currentQuestion = 0;
      state.totalQuestion = 15;
      state.interviewId = "";
    },
  },
});

export const { getNextQuestion, setAnswers, setQuestions, clearInterview } =
  currentInterviewSlice.actions;

export default currentInterviewSlice.reducer;

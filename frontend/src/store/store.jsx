import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import interviewReducer from "./interviewSlice";
import currentInterviewReducer from "./currentInterview";

const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
    currentInterview: currentInterviewReducer,
  },
});

export default store;

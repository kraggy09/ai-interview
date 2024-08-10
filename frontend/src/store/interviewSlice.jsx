import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null,
  type: null,
  languages: [],
  level: null,
  interviewType: null,
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviewDetails: (state, action) => {
      const { type, role, languages, level, interviewType } = action.payload;
      state.type = type;
      state.languages = languages;
      state.level = level;
      state.interviewType = interviewType;
      state.role = role;
    },
    clearInterviewDetails: (state) => {
      state.type = null;
      state.languages = [];
      state.level = null;
      state.interviewType = null;
      state.role = null;
    },
  },
});

export const { setInterviewDetails, clearInterviewDetails } =
  interviewSlice.actions;

export default interviewSlice.reducer;

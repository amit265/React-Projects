import { createSlice } from "@reduxjs/toolkit";

const lifeLine = createSlice({
  name: "lifeLine",
  initialState: {
    aiHint: "",
    isAiHintUsed: false,
    isSkipUsed: false,
    isEliminateUsed: false,
    loading: false,
  },

  reducers: {
    setAiHint: (state, action) => {
      state.aiHint = action.payload;
    },
    setIsAiHintUsed: (state, action) => {
      state.isAiHintUsed = action.payload;
    },
    setIsSkipUsed: (state, action) => {
      state.isSkipUsed = action.payload;
    },
    setIsEliminateUsed: (state, action) => {
      state.isEliminateUsed = action.payload;
    },
    setLoading: (state, action) => {
        state.isLoading = action.payload;
    },
    resetLifeLine: (state) => {
      state.aiHint = "";
      state.isAiHintUsed = false;
      state.isSkipUsed = false;
      state.isEliminateUsed = false;
    },
  },
});

export const {
  setAiHint,
  setIsAiHintUsed,
  setIsSkipUsed,
  setIsEliminateUsed,
  resetLifeLine,
  setLoading,
} = lifeLine.actions;

export default lifeLine.reducer;

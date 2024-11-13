import { createSlice } from "@reduxjs/toolkit";
import { getTasks, sendRespons } from "./operations.js";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

// Стан даних про користувача
const trainingSlice = createSlice({
  name: "training",
  initialState: {
    tasks: [],
    response: [],
    resultsTraining: [],
    loading: false,
    error: null,
  },
  reducers: {
    addAnswer: (state, action) => {
      state.response.push(action.payload);
    },
    clearResponse: (state) => {
      state.response = [];
    },
    clearResultsTraining: (state) => {
      state.resultsTraining = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, handlePending)
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, handleRejected)

      .addCase(sendRespons.pending, handlePending)
      .addCase(sendRespons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resultsTraining = action.payload;
      })
      .addCase(sendRespons.rejected, handleRejected);
  },
});

export const trainingReduser = trainingSlice.reducer;
export const { addAnswer, clearResponse, clearResultsTraining } = trainingSlice.actions;

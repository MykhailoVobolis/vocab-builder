import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "./operations.js";

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
  },
  reducers: {
    addAnswer: (state, action) => {
      state.response.push(action.payload);
    },
    clearResponse: (state) => {
      state.response = [];
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
      .addCase(getTasks.rejected, handleRejected);
  },
});

export const trainingReduser = trainingSlice.reducer;
export const { addAnswer, clearResponse } = trainingSlice.actions;

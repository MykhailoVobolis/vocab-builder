import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getStatistics, getTasks } from "./operations.js";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
};

// Стан даних про користувача
const wordsSlise = createSlice({
  name: "words",
  initialState: {
    categories: [],
    wordsToStudy: 0,
    tasks: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, handlePending)
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, handleRejected)

      .addCase(getStatistics.pending, handlePending)
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wordsToStudy = action.payload.totalCount;
      })
      .addCase(getStatistics.rejected, handleRejected)

      .addCase(getTasks.pending, handlePending)
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, handleRejected);
  },
});

export const wordsReduser = wordsSlise.reducer;

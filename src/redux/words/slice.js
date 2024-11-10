import { createSlice } from "@reduxjs/toolkit";
import { getAllWords, getCategories, getStatistics, getTasks, getWordsOwn } from "./operations.js";

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
    dictionary: {
      results: [],
      totalPages: 1,
      page: 1,
      perPage: 0,
    },
    recomendWords: {
      results: [],
      totalPages: 1,
      page: 1,
      perPage: 0,
    },
    currentWord: {},
    error: null,
  },
  reducers: {
    addCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
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
      .addCase(getTasks.rejected, handleRejected)

      .addCase(getWordsOwn.pending, handlePending)
      .addCase(getWordsOwn.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.dictionary = action.payload;
      })
      .addCase(getWordsOwn.rejected, handleRejected)

      .addCase(getAllWords.pending, handlePending)
      .addCase(getAllWords.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.recomendWords = action.payload;
      })
      .addCase(getAllWords.rejected, handleRejected);
  },
});

export const wordsReduser = wordsSlise.reducer;
export const { addCurrentWord, changeFilterParams, changeDictionaryPage } = wordsSlise.actions;

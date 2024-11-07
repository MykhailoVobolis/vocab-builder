import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../helpers.js";

// Категорії слів
export const getCategories = createAsyncThunk("words/getCategories", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/words/categories");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Статистика користувача
export const getStatistics = createAsyncThunk("words/getStatistics", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/words/statistics");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Список завдань
export const getTasks = createAsyncThunk("words/getTasks", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/words/tasks");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Додавання нового слова
export const addWord = createAsyncThunk("words/addWord", async (newWord, thunkAPI) => {
  try {
    const response = await axios.post("/words/create", newWord);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

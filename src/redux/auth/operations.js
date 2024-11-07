import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../helpers.js";
import { clearAuthHeader, setAuthHeader } from "../../utils/authAPI.js";

// Регістрація нового користувача
export const register = createAsyncThunk("auth/register", async (newUser, thunkAPI) => {
  try {
    const response = await axios.post("/users/signup", newUser);
    // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
    setAuthHeader(response.data.token);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Логін користувача
export const logIn = createAsyncThunk("auth/login", async (userInfo, thunkAPI) => {
  try {
    const response = await axios.post("/users/signin", userInfo);
    // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
    setAuthHeader(response.data.token);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Вихід користувача
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post("/users/signout");
    // Видалення хедеру при виходу користувача з App
    clearAuthHeader();
  } catch (error) {
    const errorMessage = handleError(error);
    return thunkAPI.rejectWithValue({ message: errorMessage });
  }
});

// Рефреш користувача.
// Збереження данних користувача при перезавантаженні App
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Читання токіна з Local Storage
    const reduxState = thunkAPI.getState();
    const savedToken = reduxState.auth.token;
    // Додавання хедерів з токіном до всіх наступних будь яких типів запитів (common)
    setAuthHeader(savedToken);

    const response = await axios.get("/users/current");
    return response.data;
  },
  {
    condition(_, thunkAPI) {
      // Перевіряємо, чи є збережений в Local Storage токін.
      // Якщо так, виконується логін за токіном
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;
      return savedToken !== null;
    },
  }
);

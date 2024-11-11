import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError } from "../helpers.js";

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

import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations.js";

const handlePending = (state) => {
  state.loading = true;
  state.authProcess = true;
};

const handleRejected = (state) => {
  state.loading = false;
  state.error = true;
  state.authProcess = false;
};

// Стан даних про користувача
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefrreshing: false,
    loading: false,
    authProcess: true,
    error: null,
  },
  reducers: {
    finishAuthProcess(state) {
      state.authProcess = false; // Завершення перевірки сесії
    },
  },
  extraReducers: (builder) => {
    builder
      // Обробка операції регістрації користувача
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authProcess = false;
      })
      .addCase(register.rejected, handleRejected)
      // Обробка операції логіну користувача
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.loadInlogIng = false;
        state.error = null;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authProcess = false;
      })
      .addCase(logIn.rejected, handleRejected)

      // Обробка операції логауту (вихода користувача з облікового запису App)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.authProcess = false;
      })
      .addCase(logOut.rejected, handleRejected)

      // Обробка операції рефрешу користувача
      .addCase(refreshUser.pending, (state) => {
        state.isRefrreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isRefrreshing = false;
        state.loading = false;
        state.authProcess = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefrreshing = false;
        state.authProcess = false;
      });
  },
});

export const { finishAuthProcess } = authSlice.actions;
export const authReduser = authSlice.reducer;

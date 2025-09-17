import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/userTypes";
import { loginUser, registerUser } from "./userThunk";

const STORAGE_KEY = "auth";

const savedUser = localStorage.getItem(STORAGE_KEY);

let parsedUser: AuthState | null = null;

try {
  parsedUser = savedUser ? JSON.parse(savedUser) : null;
} catch (error) {
  console.error("Saved user parse error:", error);
  parsedUser = null;
}

const initialState: AuthState = parsedUser
  ? { ...parsedUser, loading: false, error: null }
  : { id: null, username: null, token: null, loading: false, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.token = action.payload.token;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      //Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.username = action.payload.username;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error?.message ?? "Register failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

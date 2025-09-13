import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/userTypes";
import { loginUser } from "./userThunk";

const savedUser = localStorage.getItem("auth");

const initialState: AuthState = savedUser
  ? JSON.parse(savedUser)
  : { id: null, username: null, token: null, loading: false, error: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.token = action.payload.token;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../services/api/userApi";
import type { LoginPayload, LoginResponse } from "../../types/userTypes";
import { AxiosError } from "axios";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  } catch (err) {
    let errorMessage = "Login failed";

    if (err instanceof AxiosError) {
      errorMessage = err.response?.data?.message || err.message;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    return rejectWithValue(errorMessage);
  }
});

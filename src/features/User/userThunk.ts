import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../services/api/userApi";
import {
  type RegisterResponse,
  type LoginPayload,
  type LoginResponse,
  type RegisterPayload,
} from "../../types/userTypes";
import { AxiosError } from "axios";

// Login Thunk
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginApi(credentials);

    // Başarılı login sonrası localStorage'a kaydet
    localStorage.setItem("auth", JSON.stringify(response));

    return response;
  } catch (err: unknown) {
    let errorMessage = "Login failed";

    if (err instanceof AxiosError) {
      // Backend'den gelen mesaj varsa al, yoksa err.message
      errorMessage = err.response?.data?.message ?? err.message;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    return rejectWithValue(errorMessage);
  }
});

// Register Thunk
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/registerUser", async (newUser, { rejectWithValue }) => {
  try {
    const response = await registerApi(newUser);
    return response;
  } catch (err: unknown) {
    // TS uyumlu cast
    const axiosErr = err as AxiosError<{ message: string }>;
    const errorMessage =
      axiosErr.response?.data?.message || axiosErr.message || "Register failed";

    return rejectWithValue(errorMessage);
  }
});

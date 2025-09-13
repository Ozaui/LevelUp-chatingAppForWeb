import axios from "axios";
import type { LoginPayload, LoginResponse } from "../../types/userTypes";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000,
});

export const loginApi = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Login failed:", error.message);
      throw new Error(error.message);
    } else {
      console.log("Unexpected error:", error);
      throw new Error("Unknown error occurred");
    }
  }
};

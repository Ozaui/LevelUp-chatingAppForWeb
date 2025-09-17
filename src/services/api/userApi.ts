import axios from "axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../../types/userTypes";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

//Login sırasındaki hata kontrolleri ve api yönlendirmesi
export const loginApi = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/users/login", credentials);
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

//Register sırasındaki hata kontrolleri ve api yönlendirmesi
export const registerApi = async (
  newUser: RegisterPayload
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      "users/register",
      newUser
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendMessage =
        error.response?.data?.message || error.message || "Register failed";
      console.log("Register Failed: ", backendMessage);
      throw new Error(backendMessage);
    } else {
      console.log("Unexpected error", error);
      throw new Error("Unknown error occurred");
    }
  }
};

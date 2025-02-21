import apiClient from "../api-client";
import { RegisterFormData, UserResponse } from "../types/user";
import { SignInFormData } from "../pages/Signin";

export const createUser = async (
  data: RegisterFormData
): Promise<UserResponse> => {
  const user = await apiClient("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
  return user;
};

export const validToken = async () => {
  try {
    const data = await apiClient("/api/v1/auth/validate-token", {
      credentials: "include",
    });
    return data;
  } catch (err) {
    throw new Error((err as Error).message || "Token validation failed");
  }
};

export const login = async (data: SignInFormData) => {
  const userInfo = await apiClient("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
  return userInfo;
};

export const logout = async () => {
  await apiClient("/api/v1/auth/logout", {
    credentials: "include",
    method: "POST",
  });
};

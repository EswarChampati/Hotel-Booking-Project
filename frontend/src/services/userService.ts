import apiClient from "../api-client";
import { RegisterFormData, UserResponse } from "../types/user";

export const createUser = async (
  data: RegisterFormData
): Promise<UserResponse> => {
  const user = await apiClient("/api/v1/users/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return user;
};

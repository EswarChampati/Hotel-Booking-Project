import apiClient from "../api-client";

export const addHotel = async (data: FormData) => {
  return await apiClient("/api/v1/auth/hotel", {
    method: "POST",
    body: data,
    credentials: "include",
  });
};

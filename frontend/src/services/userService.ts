import apiClient from "../api-client";
import { HotelResponseType } from "../types/user";

export const addHotel = async (data: FormData) => {
  return await apiClient("/api/v1/auth/hotel", {
    method: "POST",
    body: data,
    credentials: "include",
  });
};

export const fetchMyHotels = async (): Promise<HotelResponseType[]> => {
  return await apiClient("/api/v1/auth/hotel", {
    credentials: "include",
  });
};

export const fetchMyHotelById = async (
  hotelId: string
): Promise<HotelResponseType> => {
  return await apiClient(`/api/v1/auth/hotel/${hotelId}`, {
    credentials: "include",
  });
};

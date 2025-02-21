import { afterEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../../api-client";
import {
  createUser,
  validToken,
  login,
  logout,
} from "../../../services/authService";

describe("authServices test", () => {
  vi.mock("../../../api-client");
  afterEach(() => {
    vi.clearAllMocks();
  });
  it("Should create an user and return user", async () => {
    const mockedData = {
      email: "eswarraghunadhavarma123@gmail.com",
      firstName: "Eswar",
      lastName: "Champati",
      password: "$2a$08$bPdrO2z8a89ZPruiI5frEuYWu0OmRHawZ6EYXNfE8Zrq4i99dgWVi",
      _id: "67a82a266415b126cf51d202",
      __v: 0,
    };
    vi.mocked(apiClient).mockResolvedValue(mockedData);
    const inputData = {
      firstName: "Eswar",
      lastName: "Champati",
      email: "eswarraghunadhavarma123@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
    };
    const responseData = await createUser(inputData);
    expect(apiClient).toHaveBeenCalledWith("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(inputData),
      credentials: "include",
    });
    expect(responseData).toEqual(mockedData);
  });

  it("Should check token is valid or not", async () => {
    const mockedData = { userId: "67a82a266415b126cf51d202" };
    vi.mocked(apiClient).mockResolvedValue(mockedData);
    const responseData = await validToken();

    expect(apiClient).toHaveBeenCalledWith("/api/v1/auth/validate-token", {
      credentials: "include",
    });

    expect(responseData).toEqual(mockedData);
  });

  it("Should throw throw error if token fails", () => {
    vi.mocked(apiClient).mockRejectedValue(
      new Error("Token validation failed")
    );
    expect(validToken()).rejects.toThrow("Token validation failed");
  });

  it("Should login and return the user data", async () => {
    const mockResponse = {
      _id: "6797389a837347f99b770e09",
      firstName: "Champati",
      lastName: "Varma",
    };
    const inputData = {
      email: "eswarraghunadhavarma@gmail.com",
      password: "12345678",
    };
    vi.mocked(apiClient).mockResolvedValue(mockResponse);
    const reponseData = await login(inputData);
    expect(apiClient).toHaveBeenCalledWith("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(inputData),
      credentials: "include",
    });

    expect(reponseData).toEqual(mockResponse);
  });

  it("Should Check the logout functionality", async () => {
    vi.mocked(apiClient).mockResolvedValue(undefined);
    await logout();
    expect(apiClient).toHaveBeenCalledWith("/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    });
  });
});

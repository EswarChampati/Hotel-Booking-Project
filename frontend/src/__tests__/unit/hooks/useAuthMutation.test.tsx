import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as router from "react-router-dom";
import * as redux from "react-redux";
import * as authService from "../../../services/authService";
import { renderHook, act } from "@testing-library/react";
import useAuthMutation from "../../../hooks/useAuthMutation";
import { showToast } from "../../../store/slices/toastSlice";
import { login } from "../../../store/slices/authSlice";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("useAuthMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(router, "useNavigate").mockImplementation(() => mockNavigate);
    vi.spyOn(redux, "useDispatch").mockImplementation(() => mockDispatch);
  });

  vi.stubGlobal("localStorage", {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
  });

  describe("Login Mutation", () => {
    const mockLoginData = {
      email: "eswar@gmail.com",
      password: "12345678",
    };

    const mockResponse = {
      _id: "user123",
      firstName: "John",
      lastName: "Doe",
    };

    it("should handle successful login", async () => {
      vi.spyOn(authService, "login").mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthMutation("login"), {
        wrapper: createWrapper(),
      });

      await act(() => result.current.mutate(mockLoginData));

      expect(authService.login).toHaveBeenCalledWith(mockLoginData);
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify({ userName: "John Doe" })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        showToast({ message: "Login Successful", type: "SUCCESS" })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        login({ userId: mockResponse._id, userName: "John Doe" })
      );
    });

    it("should handle login failure", async () => {
      const errorMessage = "Invalid credentials";
      vi.spyOn(authService, "login").mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useAuthMutation("login"), {
        wrapper: createWrapper(),
      });

      await act(() => result.current.mutate(mockLoginData));

      expect(mockDispatch).toHaveBeenCalledWith(
        showToast({ message: errorMessage, type: "FAILURE" })
      );
    });
  });

  describe("Register Mutation", () => {
    const mockRegisterData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      password: "password123",
    };

    const mockRegisterResponse = {
      _id: "user456",
      firstName: "John",
      lastName: "Doe",
    };

    it("should handle successful registration", async () => {
      vi.spyOn(authService, "createUser").mockResolvedValue(
        mockRegisterResponse
      );

      const { result } = renderHook(() => useAuthMutation("register"), {
        wrapper: createWrapper(),
      });

      await act(() => result.current.mutate(mockRegisterData));

      expect(authService.createUser).toHaveBeenCalledWith(mockRegisterData);
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "user",
        JSON.stringify({ userName: "John Doe" })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        showToast({ message: "user Created", type: "SUCCESS" })
      );
      expect(mockDispatch).toHaveBeenCalledWith(
        login({ userId: mockRegisterResponse._id, userName: "John Doe" })
      );
    });

    it("should handle registration failure", async () => {
      const errorMessage = "Email already exists";
      vi.spyOn(authService, "createUser").mockRejectedValue(
        new Error(errorMessage)
      );

      const { result } = renderHook(() => useAuthMutation("register"), {
        wrapper: createWrapper(),
      });

      await act(() => result.current.mutate(mockRegisterData));

      expect(mockDispatch).toHaveBeenCalledWith(
        showToast({ message: errorMessage, type: "FAILURE" })
      );
    });
  });
});

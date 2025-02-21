import { beforeEach, describe, expect, it, vi } from "vitest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as authService from "../../../services/authService";
import { renderHook, waitFor } from "@testing-library/react";
import useValidToken from "../../../hooks/useValidToken";
import { login, logout } from "../../../store/slices/authSlice";
import "@testing-library/jest-dom";

// Mock React Router
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

// Mock Redux
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

describe("useValidToken", () => {
  let mockNavigate: ReturnType<typeof vi.fn>;
  let mockDispatch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockNavigate = vi.fn();
    mockDispatch = vi.fn();

    // Mock hooks
    (useNavigate as unknown as () => typeof mockNavigate).mockReturnValue(
      mockNavigate
    );
    (useDispatch as unknown as () => typeof mockDispatch).mockReturnValue(
      mockDispatch
    );

    // Mock localStorage
    vi.stubGlobal("localStorage", {
      setItem: vi.fn(),
      getItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it("should handle valid token", async () => {
    const mockUserData = JSON.stringify({ userName: "John Doe" });
    const mockResponse = { userId: "12345" };

    vi.spyOn(localStorage, "getItem").mockReturnValue(mockUserData);
    vi.spyOn(authService, "validToken").mockResolvedValue(mockResponse);

    renderHook(() => useValidToken());

    await waitFor(() => {
      expect(authService.validToken).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith(
        login({ userId: mockResponse.userId, userName: "John Doe" })
      );
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it("should handle invalid token", async () => {
    vi.spyOn(localStorage, "getItem").mockReturnValue(
      JSON.stringify({ userName: "John Doe" })
    );

    vi.spyOn(authService, "validToken").mockRejectedValue(
      new Error("Invalid token")
    );

    renderHook(() => useValidToken());

    await waitFor(() => {
      expect(authService.validToken).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/login");
      expect(mockDispatch).toHaveBeenCalledWith(logout());
      expect(localStorage.removeItem).toHaveBeenCalledWith("user");
    });
  });
});

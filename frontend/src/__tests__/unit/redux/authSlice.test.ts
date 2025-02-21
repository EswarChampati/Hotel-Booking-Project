import { describe, expect, it } from "vitest";
import { AuthState, login } from "../../../store/slices/authSlice";
import authReducer from "../../../store/slices/authSlice";
import "@testing-library/jest-dom";

describe("Auth Slice", () => {
  it("Should handle login Action", () => {
    const initialState: AuthState = {
      isAuthenticated: false,
      user: null,
    };
    const action = login({ userId: "123", userName: "Test" });
    const nextState = authReducer(initialState, action);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.user).toEqual({ userId: "123", userName: "Test" });
  });

  it("Should handle logout action", () => {
    const LoggedInState: AuthState = {
      isAuthenticated: true,
      user: { userId: "123", userName: "Test" },
    };

    const action = { type: "auth/logout" };
    const nextState = authReducer(LoggedInState, action);
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.user).toBe(null);
  });
});

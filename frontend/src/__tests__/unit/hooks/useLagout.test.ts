import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { logout } from "../../../services/authService";
import { renderHook, act } from "@testing-library/react";
import useLagout from "../../../hooks/useLagout";
import { logout as logoutAction } from "../../../store/slices/authSlice";
import { showToast } from "../../../store/slices/toastSlice";

const dispatchMock = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(() => ({
    mutate: vi.fn(() => {
      logout();
      dispatchMock(logoutAction());
      dispatchMock(showToast({ message: "Sign Out!", type: "SUCCESS" }));
    }),
  })),
}));

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(() => dispatchMock),
}));

vi.mock("../../../services/authService", () => ({
  logout: vi.fn(),
}));

describe("useLagout hook functionality", () => {
  beforeEach(() => {
    // Clear mock call history before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should call logout API and dispatch logout action on success", async () => {
    const { result } = renderHook(() => useLagout());

    await act(async () => {
      result.current();
    });

    expect(logout).toHaveBeenCalled();

    expect(dispatchMock).toHaveBeenCalledWith(logoutAction());
    expect(dispatchMock).toHaveBeenCalledWith(
      showToast({ message: "Sign Out!", type: "SUCCESS" })
    );
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Header from "../../../components/Header";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthState } from "../../../store/slices/authSlice";
import "@testing-library/jest-dom";

const mockHandleLogout = vi.fn();
vi.mock("../../../hooks/useLagout", () => ({
  default: () => mockHandleLogout,
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithProviders = (preloadedState: { auth: AuthState }) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
};

describe("Header component", () => {
  it("Should render login button when user is not autheticated", () => {
    renderWithProviders({ auth: { isAuthenticated: false, user: null } });
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("Should render My-booking, My-hotels, and logout when user is not autheticated", () => {
    renderWithProviders({
      auth: {
        isAuthenticated: true,
        user: { userId: "234", userName: "Test" },
      },
    });
    expect(screen.getByText("My Bookings")).toBeInTheDocument();
    expect(screen.getByText("My hotels")).toBeInTheDocument();
    expect(screen.getByText("logout")).toBeInTheDocument();
  });

  it("Should navigates to home page when clicking on Booking.com", () => {
    renderWithProviders({
      auth: {
        isAuthenticated: true,
        user: { userId: "123", userName: "Test" },
      },
    });
    fireEvent.click(screen.getByText("Booking.com"));
    expect(mockNavigate).toBeCalledWith("/");
  });
  it("Should calls teh logout function when logout is clicked", () => {
    renderWithProviders({
      auth: {
        isAuthenticated: true,
        user: { userId: "123", userName: "Test" },
      },
    });
    const logout = screen.getByText("logout");
    fireEvent.click(logout);
    expect(mockHandleLogout).toHaveBeenCalled();
  });
});

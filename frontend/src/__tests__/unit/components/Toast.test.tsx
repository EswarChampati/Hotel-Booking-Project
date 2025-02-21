import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it } from "vitest";
import toastReducer, { ToastState } from "../../../store/slices/toastSlice";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Toast from "../../../components/Toast";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { act } from "react";

const renderWithProviders = (preloadedState: { toast: ToastState }) => {
  const store = configureStore({
    reducer: { toast: toastReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Toast />
      </MemoryRouter>
    </Provider>
  );
};
describe("Toast Component", () => {
  it("Should not visibie when visibile is false", () => {
    renderWithProviders({
      toast: { message: "", visible: false, type: "SUCCESS" },
    });
    expect(screen.queryByTestId("test-container")).not.toBeInTheDocument();
  });

  it("Should visibie when visibile is true", () => {
    renderWithProviders({
      toast: { message: "Login Successful", visible: true, type: "SUCCESS" },
    });
    expect(screen.getByText("Login Successful")).toBeInTheDocument();
  });

  it("Should apply success class when type is Success", () => {
    renderWithProviders({
      toast: { message: "Login Successful", visible: true, type: "SUCCESS" },
    });
    waitFor(() => {
      expect(screen.getByText("Login Successful")).toHaveClass("bg-slate-600");
    });
  });

  it("Should apply Failure class when type is failure", () => {
    renderWithProviders({
      toast: { message: "Failed", visible: true, type: "FAILURE" },
    });
    waitFor(
      () => {
        expect(screen.getByText("Failed")).toHaveClass("bg-red-400");
      },
      { timeout: 2000 }
    );
  });
  // it("Should toast disapper after 5seconds", async () => {
  //   vi.useFakeTimers();
  //   renderWithProviders({
  //     toast: { message: "Timeout Test", type: "SUCCESS", visible: true },
  //   });
  //   act(() => {
  //     vi.advanceTimersByTime(5000);
  //   });
  //   await waitFor(
  //     () => expect(screen.getByText("Timeout Test")).not.toBeInTheDocument(),
  //     { timeout: 6000 }
  //   );
  //   vi.useRealTimers();
  // });
});

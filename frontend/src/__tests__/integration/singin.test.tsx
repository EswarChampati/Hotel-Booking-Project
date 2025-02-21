import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import SignIn from "../../pages/Signin";
import "@testing-library/jest-dom";

const mockMutate = vi.fn();
vi.mock("../../hooks/useAuthMutation", () => ({
  default: () => ({
    mutate: () => mockMutate,
  }),
}));
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWIthRouter = () => {
  render(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>
  );
};
describe("Signin Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should rende the form correctly", () => {
    renderWIthRouter();
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter the Email Address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter the password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText("Click here to Create an account")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("Should throw error when form is empty", () => {
    renderWIthRouter();
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    waitFor(() => {
      expect(screen.getAllByText("This field is required").length).toBe(2);
    });
  });

  it("Navigate to register page on clicking the 'Create the account'", () => {
    renderWIthRouter();
    fireEvent.click(screen.getByText("Click here to Create an account"));
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/register");
    });
  });

  it("Navigate to dash board on successful", () => {
    renderWIthRouter();
    fireEvent.input(screen.getByPlaceholderText(/Enter the Email Address/i), {
      target: { value: "eswarvarmna@gmail.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/Enter the password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));
    waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: "eswarvarmna@gmail.com",
        password: "password123",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});

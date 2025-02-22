import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Register from "../../pages/Register";
import "@testing-library/jest-dom";

const renderWithQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </QueryClientProvider>
  );
};
const mockMutate = vi.fn();
// Mock the mutation hook to prevent actual API calls
vi.mock("../../hooks/useAuthMutation", () => ({
  default: () => ({
    mutate: mockMutate,
  }),
}));

describe("Register component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the form fields correctly", () => {
    renderWithQueryClient();

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Enter the First Name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter the Last Name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter the Email Address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter the password")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Re-Enter the password/i)
    ).toBeInTheDocument();
  });
  it("Should submit the form when all fields are filled correctly", async () => {
    renderWithQueryClient();

    const firstName = screen.getByPlaceholderText(/Enter the First Name/i);
    const lastName = screen.getByPlaceholderText(/Enter the Last Name/i);
    const email = screen.getByPlaceholderText(/Enter the Email Address/i);
    const password = screen.getByPlaceholderText("Enter the password");
    const confirmPassword = screen.getByPlaceholderText(
      /Re-Enter the password/i
    );
    const submitButton = screen.getByRole("button", { name: "Create User" });

    fireEvent.change(firstName, { target: { value: "Eswar" } });
    fireEvent.change(lastName, { target: { value: "Champati" } });
    fireEvent.change(email, { target: { value: "eswarchampati@gmail.com" } });
    fireEvent.change(password, { target: { value: "password123" } });
    fireEvent.change(confirmPassword, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
      expect(mockMutate).toHaveBeenCalledWith({
        firstName: "Eswar",
        lastName: "Champati",
        email: "eswarchampati@gmail.com",
        password: "password123",
        confirmPassword: "password123",
      });
    });
  });
  it("Should throw the error when we click without details", () => {
    renderWithQueryClient();
    fireEvent.click(screen.getByRole("button", { name: "Create User" }));
    waitFor(() => {
      expect(screen.getAllByText("This field is required").length).toBe(5);
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PasswordFeild from "../../../components/PasswordFeild";
import "@testing-library/jest-dom";

describe("Pasword Field component", () => {
  it("Should render the label, input feild and toggle button", () => {
    const props = {
      label: "Password",
      placeholder: "Enter the password",
      register: vi.fn(),
      name: "Password",
      validationRules: {},
      watch: vi.fn(),
      errors: {},
    };
    render(<PasswordFeild {...props} />);
    const input = screen.getByPlaceholderText("Enter the password");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");

    expect(screen.getByText("Password")).toBeInTheDocument();
    const ToggleButton = screen.getByRole("button");
    expect(ToggleButton).toBeInTheDocument();
  });
  it("Should toggle password visibility functionality", () => {
    const props = {
      label: "Password",
      placeholder: "Enter the password",
      register: vi.fn(),
      name: "Password",
      validationRules: {},
      watch: vi.fn(),
      errors: {},
    };
    render(<PasswordFeild {...props} />);
    const input = screen.getByPlaceholderText("Enter the password");
    expect(input).toHaveAttribute("type", "password");
    const ToggleButton = screen.getByRole("button");
    fireEvent.click(ToggleButton);
    expect(input).toHaveAttribute("type", "text");
    fireEvent.click(ToggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("Should render the error message if it is present", () => {
    const props = {
      label: "Password",
      placeholder: "Enter the password",
      register: vi.fn(),
      name: "Password",
      validationRules: {},
      watch: vi.fn(),
      errors: { Password: { message: "Password is required" } },
    };

    render(<PasswordFeild {...props} />);
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });
});

import { describe, expect, it, vi } from "vitest";
import InputFeild from "../../../components/InputFeild";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("InputFeildComponent", () => {
  it("Should render the label and input field", () => {
    const props = {
      label: "User Name",
      placeholder: "Enter the user name",
      register: vi.fn(),
      type: "text",
      name: "userName",
      errors: {},
    };

    render(<InputFeild {...props} />);

    expect(screen.getByText("User Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter the user name")
    ).toBeInTheDocument();
  });

  it("Should allow typing the input feild", () => {
    const props = {
      label: "Email",
      placeholder: "Enter the Email",
      register: vi.fn(),
      type: "text",
      name: "userName",
      errors: {},
    };
    render(<InputFeild {...props} />);
    const input = screen.getByPlaceholderText("Enter the Email");
    fireEvent.change(input, { target: { value: "Testuser@gmail.com" } });
    expect(input).toHaveValue("Testuser@gmail.com");
  });

  it("Should allow typing the input feild", () => {
    render(
      <InputFeild
        label="Password"
        placeholder="Enter your password"
        register={vi.fn()}
        type="password"
        name="password"
        errors={{ password: { message: "Password is required" } }}
      />
    );

    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });
});

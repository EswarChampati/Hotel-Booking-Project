import { describe, expect, vi, it } from "vitest";
import AnimatedButton from "../../../components/AnimatedButton";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Animated Button component", () => {
  const mockOnCLick = vi.fn();
  it("should render the children correctly", () => {
    render(
      <MemoryRouter>
        <AnimatedButton to="/test">Click Me</AnimatedButton>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  it("should call the onClick when clicked", () => {
    render(
      <MemoryRouter>
        <AnimatedButton to="/test" onClick={mockOnCLick}>
          Click Me
        </AnimatedButton>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);
    expect(mockOnCLick).toBeCalledTimes(1);
  });

  it("has correct navigation link", () => {
    render(
      <MemoryRouter>
        <AnimatedButton to="/test">Click Me</AnimatedButton>
      </MemoryRouter>
    );

    const linkElement = screen.getByText("Click Me").closest("a");
    expect(linkElement).toHaveAttribute("href", "/test");
  });
});

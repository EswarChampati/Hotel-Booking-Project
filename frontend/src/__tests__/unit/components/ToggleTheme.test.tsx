import { describe, expect, it, vi, beforeEach } from "vitest";
import ToggleTheme from "../../../components/ToggleTheme";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useTheme from "../../../hooks/useTheme";

vi.mock("../../../hooks/useTheme");

describe("Toggle theme component", () => {
  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: false,
      themeClickHandler: vi.fn(),
    });
  });

  it("Should render sun icon when isDarkMode is false", () => {
    render(<ToggleTheme />);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("Should render moon icon when isDarkMode is true", () => {
    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: true,
      themeClickHandler: vi.fn(),
    });
    render(<ToggleTheme />);
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });
  it("Shpould call the themeClickHandler once", () => {
    const themeClickHandler = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      isDarkMode: false,
      themeClickHandler,
    });
    render(<ToggleTheme />);
    const button = screen.getByTestId("sun-icon");
    fireEvent.click(button);
    expect(themeClickHandler).toHaveBeenCalledTimes(1);
  });
});

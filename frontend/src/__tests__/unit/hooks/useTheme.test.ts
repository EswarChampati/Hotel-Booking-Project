import { beforeEach, describe, expect, it } from "vitest";
import useTheme from "../../../hooks/useTheme";
import { act, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("useTheme hook", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("Should initialize with light mode by default", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDarkMode).toBeFalsy();
    expect(document.documentElement.classList.contains("dark")).toBeFalsy();
  });

  it("Should initialize with dark mode when saved in localStorage", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());

    expect(document.documentElement.classList.contains("dark")).toBeTruthy();
    expect(result.current.isDarkMode).toBeTruthy();
  });

  it("Should toggle theme and update local storage", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDarkMode).toBeFalsy();
    expect(document.documentElement.classList.contains("dark")).toBeFalsy();

    act(() => {
      result.current.themeClickHandler();
    });

    expect(result.current.isDarkMode).toBeTruthy();
    expect(document.documentElement.classList.contains("dark")).toBeTruthy();
    expect(localStorage.getItem("theme")).toBe("dark");

    act(() => {
      result.current.themeClickHandler();
    });

    expect(result.current.isDarkMode).toBeFalsy();
    expect(document.documentElement.classList.contains("dark")).toBeFalsy();
    expect(localStorage.getItem("theme")).toBe("light");
  });
});

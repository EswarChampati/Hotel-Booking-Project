import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserLayout from "../../../layouts/UserLayout";
import "@testing-library/jest-dom";
vi.mock("../../../components/Header", () => ({
  default: () => <div data-testid="header">Mocked Header</div>,
}));
vi.mock("../../../components/footer", () => ({
  default: () => <div data-testid="footer">Mocked footer</div>,
}));
describe("User Layout", () => {
  it("Should render   Header footer and Child Component", () => {
    render(
      <UserLayout>
        <div data-testid="child">Child Component</div>
      </UserLayout>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
  it("should apply correct layout classes", () => {
    const { container } = render(
      <UserLayout>
        <div data-testid="child">Child Component</div>
      </UserLayout>
    );

    expect(container.firstChild).toHaveClass("min-h-screen");
    expect(screen.getByTestId("child").parentElement).toHaveClass(
      "py-10 text-common bg-common"
    );
  });
});

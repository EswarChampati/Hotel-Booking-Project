import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Footer from "../../../components/footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  it("Should render without Crashing", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it("Should render all navigation links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Privacy policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms and Conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/Partners/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  it("Should links have the oorect href values", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Privacy policy/i)).toHaveAttribute(
      "href",
      "/policy"
    );
    expect(screen.getByText(/Terms and Conditions/i)).toHaveAttribute(
      "href",
      "/Terms and conditions"
    );
    expect(screen.getByText(/Partners/i)).toHaveAttribute("href", "/partners");
    expect(screen.getByText(/About/i)).toHaveAttribute("href", "/Aboutus");
  });
});

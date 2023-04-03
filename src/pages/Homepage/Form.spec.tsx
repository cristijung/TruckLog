import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, expect, it } from "vitest";
import { Homepage } from ".";

export {};

vi.mock("react-router-dom", () => {
  return {
    useNavigate() {
      return [null, false];
    },
  };
});

describe("Forms of HomePage", () => {
  it("renders a name input", async () => {
    render(<Homepage />);

    let nameInput = screen.getByPlaceholderText(/digite aqui seu nome/i);

    expect(nameInput).toBeInTheDocument();
  });

  it("renders a email input", async () => {
    render(<Homepage />);

    let emailInput = screen.getByPlaceholderText(/digite aqui seu e\-mail/i);

    expect(emailInput).toBeInTheDocument();
  });
});

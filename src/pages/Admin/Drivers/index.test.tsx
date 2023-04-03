import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Roles } from "./index";
import { vi, it, expect } from "vitest";

vi.mock("../../../../redux/features/role/roleSlice", () => ({
  useGetDriversQuery: vi.fn((data) => ({
    data: [
      {
        idUsuario: 1,
        nome: "Teste",
        email: "email21@email.com",
        documento: "12345678910",
        status: "Ativo",
      },
      {
        idUsuario: 2,
        nome: "Teste 2",
        email: "emai222@email.com",
        documento: "12345678955",
        status: "Ativo",
      },
    ],
  })),
}));

describe("Roles", () => {
  it("should render", () => {
    render(<Roles />);
    expect(screen.getByText("Motoristas")).to.exist;
  });

  it("should render 2 drivers", () => {
    render(<Roles />);
    expect(screen.getByText("Teste")).to.exist;
    expect(screen.getByText("Teste 2")).to.exist;
  });
});

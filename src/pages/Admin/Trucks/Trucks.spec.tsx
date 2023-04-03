import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Caminhoes } from ".";
import { vi, it, expect } from "vitest";

vi.mock("../../../shared/hooks/useTrucks", () => ({
  useTrucks: vi.fn(() => ({
    trucks: [
      {
        idCaminhao: 1,
        modelo: "Scania",
        placa: "ABC1234",
        nivelCombustivel: 80,
        statusCaminhao: "DISPONIVEL",
        status: "ATIVO",
      },
      {
        idCaminhao: 2,
        modelo: "Volvo",
        placa: "DEF5678",
        nivelCombustivel: 30,
        statusCaminhao: "EM_VIAGEM",
        status: "ATIVO",
      },
    ],
  })),
}));

describe("Caminhoes", () => {
  it("should render Caminhoes page", () => {
    render(<Caminhoes />);
    expect(screen.findByText("Caminhões")).to.exist;
  });

  it("should render truck cards", () => {
    render(<Caminhoes />);
    expect(screen.getByText("Scania")).to.exist;
    expect(screen.getByText("ABC1234")).to.exist;
    expect(screen.getByText("Volvo")).to.exist;
    expect(screen.getByText("DEF5678")).to.exist;
  });

  it("should filter trucks", () => {
    render(<Caminhoes />);
    const searchInput = screen.getByPlaceholderText("Procurar caminhões");
    userEvent.type(searchInput, "Scania");
    expect(screen.getByText("Scania")).to.exist;
    expect(screen.queryByText("Volvo")).to.exist;
  });

  it('should open CreateTruckModal when "Cadastrar Caminhão" button is clicked', async () => {
    render(<Caminhoes />);
    const createButton = screen.getByText("Cadastrar Caminhão");
    userEvent.click(createButton);
    expect(await screen.findByText("Cadastrar Caminhão")).to.exist;
  });

  it("should open EditTruckModal when edit button is clicked", async () => {
    render(<Caminhoes />);
    const editButton = screen.getAllByTitle("Abastecer")[0];
    userEvent.click(editButton);
    expect(await screen.findByText("Abastecer Caminhão")).to.exist;
  });

  it("should open DeleteTruckModal when delete button is clicked", async () => {
    render(<Caminhoes />);
    const deleteButton = screen.getAllByTitle("Deletar")[0];
    userEvent.click(deleteButton);
    expect(await screen.findByText("Tem certeza que deseja deletar?")).to.exist;
  });
});

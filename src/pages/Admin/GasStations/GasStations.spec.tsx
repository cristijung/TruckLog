import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Postos } from ".";
import { vi, it, expect } from "vitest";

vi.mock("../../../redux/features/gasStation/gasStationSlice", () => ({
  useGetGasStationQuery: vi.fn(() => ({
    data: [
      {
        id: "642ad895fdd4ca165d574681",
        nome: "Posto DBC POA",
        location: {
          x: 30,
          y: 30,
          type: "Point",
          coordinates: [30, 30],
        },
        cidade: "Porto Alegre",
        valorCombustivel: 5.2,
        status: "ATIVO",
      },
      {
        id: "642ae2e5fdd4ca165d574696",
        nome: "Posto Petrobras",
        location: {
          x: -29.986808526923795,
          y: -29.986808526923795,
          type: "Point",
          coordinates: [-29.986808526923795, -29.986808526923795],
        },
        cidade: "Tramandai",
        valorCombustivel: 5.89,
        status: "ATIVO",
      },
      {
        id: "642aeb3023b4d87c78edd4f1",
        nome: "Posto Imperatriz",
        location: {
          x: -29.99681672853041,
          y: -29.99681672853041,
          type: "Point",
          coordinates: [-29.99681672853041, -29.99681672853041],
        },
        cidade: "Tramandai",
        valorCombustivel: 5.89,
        status: "ATIVO",
      },
    ],
  })),
  useAddGasStationMutation: vi.fn(() => ""),
  useEditGasStationMutation: vi.fn(() => ""),
  useDeleteGasStationMutation: vi.fn(() => ""),
}));

describe("GasStations Page", () => {
  it("should render GasStations cards", () => {
    render(<Postos />);
    expect(screen.getByText("Posto DBC POA")).to.exist;
    expect(screen.getByText("Posto Petrobras")).to.exist;
    expect(screen.getByText("Posto Imperatriz")).to.exist;
  });

  it("should filter GasStations", async () => {
    render(<Postos />);
    const searchInput = screen.getByPlaceholderText("Procurar postos");
    userEvent.type(searchInput, "Petrobras");
    expect(await screen.findByText("Posto Petrobras")).to.exist;
  });

  it('should open CreateGasStationModal when "Cadastrar motorista" button is clicked', async () => {
    render(<Postos />);
    const createButton = screen.getByText("Cadastrar Posto");
    userEvent.click(createButton);
    expect(
      await screen.findByPlaceholderText(
        "Digite o nome da cidade do posto aqui"
      )
    ).to.exist;
  });

  it("should open EditGasStationModal when edit button is clicked", async () => {
    render(<Postos />);
    const editButton = screen.getAllByTitle("Editar Posto")[0];
    userEvent.click(editButton);
    expect(await screen.findByText("Edite os dados do Posto")).to.exist;
  });

  it("should open RemoveGasStationModal when delete button is clicked", async () => {
    render(<Postos />);
    const deleteButton = screen.getAllByTitle("Deletar Posto")[0];
    userEvent.click(deleteButton);
    expect(await screen.findByText("Tem certeza que deseja deletar?")).to.exist;
  });
});

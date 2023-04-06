import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Viagens } from ".";
import { vi, it, expect } from "vitest";

vi.mock("../../../redux/features/trip/tripSlice", () => ({
  useGetTripsQuery: vi.fn(() => ({
    data: [
      {
        descricao: "Viagem POA até VIAM curta",
        dataInicio: "2023-04-08",
        dataFim: "2023-04-12",
        idCaminhao: 5,
        idRota: 1,
        idViagem: 4,
        statusViagem: "EM_ANDAMENTO",
        idUsuario: 113,
      },
      {
        descricao: "Viagem RJ até SP",
        dataInicio: "2023-04-10",
        dataFim: "2023-04-12",
        idCaminhao: 4,
        idRota: 1,
        idViagem: 5,
        statusViagem: "EM_ANDAMENTO",
        idUsuario: 81,
      },
      {
        descricao: "Viagem de POA até Cacho 1 parada",
        dataInicio: "2023-04-10",
        dataFim: "2023-04-20",
        idCaminhao: 6,
        idRota: 3,
        idViagem: 6,
        statusViagem: "FINALIZADA",
        idUsuario: 114,
      },
    ],
  })),
  useAddTripsMutation: vi.fn(() => ""),
  useEditTripsMutation: vi.fn(() => ""),
  useDeleteTripMutation: vi.fn(() => ""),
}));

vi.mock("../../../redux/features/truck/truckSlice", () => ({
  useGetTruckQuery: vi.fn(() => ({
    data: [
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

vi.mock("../../../redux/features/role/roleSlice", () => ({
  useGetDriversByDrivingStatusQuery: vi.fn(() => ""),
}));

vi.mock("../../../redux/features/route/routeSlice", () => ({
  useGetRouteByStatusQuery: vi.fn(() => ""),
}));

describe("Trips Page", () => {
  it("should render page title", async () => {
    render(<Viagens />);
    expect(screen.getByTestId("page-name").innerHTML).toBe("Viagens");
  });

  it("should render Trips cards", () => {
    render(<Viagens />);
    expect(screen.getByText("Viagem POA até VIAM curta")).to.exist;
    expect(screen.getByText("Viagem RJ até SP")).to.exist;
    expect(screen.getByText("Viagem de POA até Cacho 1 parada")).to.exist;
  });

  it("should filter Trips", async () => {
    render(<Viagens />);
    const searchInput = screen.getByPlaceholderText("Procurar viagens");
    userEvent.type(searchInput, "POA");
    expect(await screen.findByText("Viagem de POA até Cacho 1 parada")).to
      .exist;
  });

  it('should open CreateTripModal when "Criar Viagem" button is clicked', async () => {
    render(<Viagens />);
    const createButton = screen.getByText("Criar Viagem");
    userEvent.click(createButton);
    expect(await screen.findByText("Escolha um caminhão")).to.exist;
  });

  it("should open EditTripModal when edit button is clicked", async () => {
    render(<Viagens />);
    const editButton = screen.getAllByTitle("Editar Viagem")[0];
    userEvent.click(editButton);
    expect(await screen.findByText("Editar viagem")).to.exist;
  });

  it("should open DeleteTripModal when concludesTrip button is clicked", async () => {
    render(<Viagens />);
    const deleteButton = screen.getAllByTitle("Concluir Viagem")[0];
    userEvent.click(deleteButton);
    expect(
      await screen.findByText("Tem certeza que deseja finalizar a viagem?")
    ).to.exist;
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Rotas } from ".";
import { vi, it, expect } from "vitest";

vi.mock("../../../redux/features/route/routeSlice", () => ({
  useGetRouteQuery: vi.fn(() => ({
    data: [
      {
        idRota: 1,
        descricao: "Porto Alegre até Cachoeirinha",
        localPartida: "Porto Alegre",
        localDestino: "Cachoeirinha",
        status: "ATIVO",
      },
      {
        idRota: 2,
        descricao: "Bahia até Guarulhos",
        localPartida: "Bahia",
        localDestino: "Guarulhos",
        status: "ATIVO",
      },
    ],
  })),
  useAddRouteMutation: vi.fn(() => ""),
  useEditRouteMutation: vi.fn(() => ""),
  useDeleteRouteMutation: vi.fn(() => ""),
}));

describe("'Rotas' Page", () => {
  it("should render routes cards", () => {
    render(<Rotas />);
    expect(screen.getByText("Porto Alegre até Cachoeirinha")).to.exist;
    expect(screen.getByText("Porto Alegre")).to.exist;
    expect(screen.getByText("Cachoeirinha")).to.exist;
    expect(screen.getByText("Bahia até Guarulhos")).to.exist;
    expect(screen.getByText("Bahia")).to.exist;
    expect(screen.getByText("Guarulhos")).to.exist;
  });

  it("should filter routes", async () => {
    render(<Rotas />);
    const searchInput = screen.getByPlaceholderText("Procurar postos");
    userEvent.type(searchInput, "Bahia");
    expect(await screen.findByText("Bahia até Guarulhos")).to.exist;
    expect(screen.queryByText("Bahia")).to.exist;
    expect(screen.queryByText("Guarulhos")).to.exist;
  });

  it('should open CreateRouteModal when "Cadastrar Rota" button is clicked', async () => {
    render(<Rotas />);
    const createButton = screen.getByText("Cadastrar Rota");
    userEvent.click(createButton);
    expect(
      await screen.findByPlaceholderText("Digite a descrição da nova rota aqui")
    ).to.exist;
  });

  it("should open EditRouteModal when edit button is clicked", async () => {
    render(<Rotas />);
    const editButton = screen.getAllByTitle("Editar Posto")[0];
    userEvent.click(editButton);
    expect(await screen.findByText("Edite a Rota:")).to.exist;
  });

  it("should open DeleteRouteModal when delete button is clicked", async () => {
    render(<Rotas />);
    const deleteButton = screen.getAllByTitle("Deletar Posto")[0];
    userEvent.click(deleteButton);
    expect(await screen.findByText("Tem certeza que deseja deletar?")).to.exist;
  });
});

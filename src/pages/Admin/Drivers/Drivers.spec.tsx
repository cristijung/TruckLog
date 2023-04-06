import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Roles } from ".";
import { vi, it, expect } from "vitest";

vi.mock("../../../redux/features/role/roleSlice", () => ({
  useGetDriversQuery: vi.fn(() => ({
    data: [
      {
        idUsuario: 5,
        login: "moto",
        nome: "Jose",
        email: "jose@email.com",
        documento: "32458234523",
        status: "INATIVO",
        cargos: [
          {
            nome: "ROLE_MOTORISTA",
            idCargo: 3,
          },
        ],
      },
      {
        idUsuario: 6,
        login: "colab",
        nome: "Josiclei",
        email: "josiclei123@email.com",
        documento: "88833333333",
        status: "ATIVO",
        cargos: [
          {
            nome: "ROLE_COLABORADOR",
            idCargo: 2,
          },
        ],
      },
      {
        idUsuario: 7,
        login: "qa",
        nome: "Qa da Silva",
        email: "qa@email.com",
        documento: "12345678111",
        status: "ATIVO",
        cargos: [
          {
            nome: "ROLE_ADMIN",
            idCargo: 1,
          },
        ],
      },
    ],
  })),
  useCreateDriverMutation: vi.fn(() => ""),
  useEditDriversMutation: vi.fn(() => ""),
  useDeleteDriversMutation: vi.fn(() => ""),
}));

describe("Drivers Page", () => {
  it("should render page title", async () => {
    render(<Roles />);
    expect(screen.getByTestId("page-name").innerHTML).toBe("Motoristas");
  });

  it("should render Drivers cards", () => {
    render(<Roles />);
    expect(screen.getByText("Jose")).to.exist;
    expect(screen.getByText("INATIVO")).to.exist;
    expect(screen.getByText("Josiclei")).to.exist;
    expect(screen.getByText("ATIVO")).to.exist;
  });

  it("should filter drivers", async () => {
    render(<Roles />);
    const searchInput = screen.getByPlaceholderText("Procurar motoristas");
    userEvent.type(searchInput, "clei");
    expect(await screen.findByText("Josiclei")).to.exist;
  });

  it('should open CreateDriverModal when "Cadastrar motorista" button is clicked', async () => {
    render(<Roles />);
    const createButton = screen.getByText("Cadastrar motorista");
    userEvent.click(createButton);
    expect(await screen.findByPlaceholderText("CNH ou CPF")).to.exist;
  });

  it("should open EditDriverModal when edit button is clicked", async () => {
    render(<Roles />);
    const editButton = screen.getAllByTitle("Editar Motorista")[0];
    userEvent.click(editButton);
    expect(await screen.findByText("Editar Usuario")).to.exist;
  });

  it("should open DeleteDriverModal when delete button is clicked", async () => {
    render(<Roles />);
    const deleteButton = screen.getAllByTitle("Deletar Motorista")[0];
    userEvent.click(deleteButton);
    expect(await screen.findByText("Tem certeza que deseja deletar?")).to.exist;
  });
});

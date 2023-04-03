export interface ILoggedUser {
  idUsuario: number;
  login: string;
  nome: string;
  email: string;
  documento: string;
  status: "ATIVO" | "INATIVO";
  cargos: {
    nome: string;
    idCargo: number;
  }[];
}

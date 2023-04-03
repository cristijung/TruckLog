export interface IUser {
  login: string;
  senha: string;
}
export interface IDriver {
  idUsuario: 0;
  login: "string";
  nome: "string";
  email: "string";
  documento: "string";
  status: "INATIVO";
  cargos: [
    {
      nome: "ROLE_ADMIN";
      idCargo: 0;
    }
  ];
}

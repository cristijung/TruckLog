export interface IDriver {
  idUsuario: number;
  login: string;
  nome: string;
  email: string;
  documento: string;
  status: string;
  cargos: [
    {
      nome: string;
      idCargo: number;
    }
  ];
}

export interface INewUserFromDriver {
  login: string;
  senha: string;
  nome: string;
  email: string;
  documento: string;
  nomeCargo: string;
}

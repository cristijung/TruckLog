export interface IDriver {
  idUsuario: number;
  login: string;
  nome: string;
  senha: string;
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

export interface IEditedDriver {
  nome: string;
  senha: string;
  email: string;
  documento: string;
}

export interface INewUserFromDriver {
  login: string;
  senha: string;
  nome: string;
  email: string;
  documento: string;
  nomeCargo: string;
}

export interface DriverPagination {
  pagina: number;
  tamanho: number;
}

export interface RoleResponse {
  map(
    arg0: (driver: import("./IDriver").IDriver) => JSX.Element
  ): import("react").ReactNode;
  totalElementos: number;
  quantidadePaginas: number;
  pagina: number;
  tamanho: number;
  elementos: IDriver[];
}

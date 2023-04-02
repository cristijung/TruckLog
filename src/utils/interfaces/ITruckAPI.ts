export interface ICaminhao {
  modelo: string;
  placa: string;
  nivelCombustivel: number;
  idCaminhao: number;
  statusCaminhao: 'ESTACIONADO' | 'EM VIAGEM';
  status: 'ATIVO' | 'INATIVO';
  idUsuario: number;
}
export interface ICaminhaoCreate {
  modelo: string;
  placa: string;
  nivelCombustivel: number;
}

export interface ICaminhaoEdit {
  nivelCombustivel: number;
  gas: number;
  idCaminhao: number;
}

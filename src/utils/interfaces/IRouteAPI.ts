export interface IRotaCreate {
  descricao: string;
  localPartida: string;
  localDestino: string;
}

export interface IRota {
  descricao: string;
  localPartida: string;
  localDestino: string;
  idRota: number;
  idUsuario: number;
  status: 'INATIVO' | 'ATIVO';
}
export interface IRotaEdit {
  descricao: string;
  localPartida: string;
  localDestino: string;
  idRota: number;
}

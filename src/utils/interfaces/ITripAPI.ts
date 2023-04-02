export interface ITrip {
	idMotorista: number;
	descricao: string;
	dataInicio: string;
	dataFim: string;
	idCaminhao: number;
	idRota: number;
	idViagem: number;
	statusViagem: string;
	idUsuario: number;
}

export interface IAddTrip {
	descricao: string;
	dataInicio: string;
	dataFim: string;
	idCaminhao: number;
	idRota: number;
}

export interface IEditTrip {
	descricao: string;
	dataInicio: string;
	dataFim: string;
}

export interface IDeleteTrip {
	idMotorista: number;
	idViagem: number;
}

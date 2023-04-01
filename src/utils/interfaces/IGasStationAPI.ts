export interface IgetGasStation {
    id: string;
    nome: string;
    location: {
        x: number;
        y: number;
        type: string;
    };
    coordinates: [number, number];
    cidade: string;
    valorCombustivel: number;
    status: string;
}

export interface IFormRespose {
    nome: string;
    longitude: string;
    latitude: string;
    cidade: string;
    valorCombustivel: number;
}

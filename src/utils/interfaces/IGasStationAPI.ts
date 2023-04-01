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

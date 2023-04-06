import { apiSlice } from "../../rootReducer";
import { api } from "../../../utils/api";
import {
    IgetGasStation,
    IFormRespose,
    IeditGasStation,
} from "../../../utils/interfaces/IGasStationAPI";

const apiSliceWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ["gasStations"],
});

const gasStationSlice = apiSliceWithTag.injectEndpoints({
    endpoints: (build) => ({
        getGasStation: build.query<IgetGasStation[], void>({
            query: () => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        addGasStation: build.mutation<IFormRespose, IFormRespose>({
            query: (gasStation) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: gasStation,
            }),
        }),
        editGasStation: build.mutation<IeditGasStation, IeditGasStation>({
            query: (gasStation) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto?idPosto=${gasStation.id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    nome: gasStation.nome,
                    longitude: gasStation.longitude,
                    latitude: gasStation.latitude,
                    cidade: gasStation.cidade,
                    valorCombustivel: gasStation.valorCombustivel,
                },
            }),
        }),
        deleteGasStation: build.mutation<string, string>({
            query: (idPosto) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto?idPosto=${idPosto}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
});

export const {
    useGetGasStationQuery,
    useAddGasStationMutation,
    useEditGasStationMutation,
    useDeleteGasStationMutation,
} = gasStationSlice;

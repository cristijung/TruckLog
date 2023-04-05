import { apiSlice } from "../../rootReducer";
import { api } from "../../../utils/api";

import {
    IRotaCreate,
    IRota,
    IRotaEdit,
} from "../../../utils/interfaces/IRouteAPI";

const apiSliceWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ["route"],
});

const routeSlice = apiSliceWithTag.injectEndpoints({
    endpoints: (build) => ({
        getRoute: build.query<IRota[], void>({
            query: () => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/rota`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        getRouteByStatus: build.query<IRota[], void>({
            query: () => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/rota/listar-ativas`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        addRoute: build.mutation<IRotaCreate, IRotaCreate>({
            query: (rota) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/rota`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: rota,
            }),
        }),
        editRoute: build.mutation<IRotaEdit, IRotaEdit>({
            query: (rota) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/rota?idRota=${rota.idRota}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    descricao: rota.descricao,
                    localPartida: rota.localPartida,
                    localDestino: rota.localDestino,
                },
            }),
        }),
        deleteRoute: build.mutation<number, number>({
            query: (idRota) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/rota?idRota=${idRota}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
});

export const {
    useGetRouteQuery,
    useGetRouteByStatusQuery,
    useAddRouteMutation,
    useEditRouteMutation,
    useDeleteRouteMutation,
} = routeSlice;

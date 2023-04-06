import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
    IDriver,
    INewUserFromDriver,
    IEditedDriver,
    IDriveByStatus,
} from "../../../utils/interfaces/IDriver";

import { apiSlice } from "../../rootReducer";

export const driverSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createDriver: builder.mutation<IDriver, INewUserFromDriver>({
            query: (data) => ({
                url: "usuario",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: data,
            }),
        }),
        getDrivers: builder.query<IDriver[], number>({
            query: (page) => ({
                url: `usuario?usuario/listar-por-cargo-status/paginacao?cargo=ROLE_MOTORISTA&status=ATIVO&page=${page}&size=20`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
        editDrivers: builder.mutation<IEditedDriver, any>({
            query: (data) => ({
                url: `usuario?idUsuario=${data.idUsuario}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    nome: data.nome,
                    senha: data.senha,
                    email: data.email,
                    documento: data.documento,
                },
            }),
        }),

        getDriversByDrivingStatus: builder.query<IDriveByStatus, number>({
            query: (page) => ({
                url: `usuario/motoristas-livres?page=${page}&size=25`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        deleteDrivers: builder.mutation<IDriver, number>({
            query: (id) => ({
                url: `usuario?idUsuario=${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
});

export const {
    useCreateDriverMutation,
    useGetDriversQuery,
    useEditDriversMutation,
    useGetDriversByDrivingStatusQuery,
    useDeleteDriversMutation,
} = driverSlice;

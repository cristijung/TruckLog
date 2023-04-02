import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDriver,
  INewUserFromDriver,
  DriverPagination,
  RoleResponse,
  IEditedDriver,
} from "../../../utils/interfaces/IDriver";

import { apiSlice } from "../../rootReducer";
import { AnyAction } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
export const driverSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDriver: builder.mutation<IDriver, INewUserFromDriver>({
      query: (data) => ({
        url: "usuario",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
    }),
    getDrivers: builder.query<RoleResponse<IDriver>, number>({
      query: (page) => ({
        url: `usuario?usuario/listar-por-cargo-status/paginacao?cargo=ROLE_MOTORISTA&status=ATIVO&page=${page}&size=20`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editDrivers: builder.mutation<IEditedDriver, any>({
      query: (data) => ({
        url: `usuario?idUsuario=${data.idUsuario}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          nome: data.nome,
          senha: data.senha,
          email: data.email,
          documento: data.documento,
        },
      }),
    }),

    deleteDrivers: builder.mutation<IDriver, number>({
      query: (id) => ({
        url: `usuario?idUsuario=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateDriverMutation,
  useGetDriversQuery,
  useEditDriversMutation,
  useDeleteDriversMutation,
} = driverSlice;

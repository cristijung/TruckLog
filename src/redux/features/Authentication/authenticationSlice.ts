import { ILoggedUser } from "../../../utils/interfaces/IAuthentication.";
import { IUser } from "../../../utils/interfaces/IUser";
import { apiSlice } from "../../rootReducer";

const token = localStorage.getItem("token");

const authenticationSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        authLogin: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: "http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/auth",
                method: "POST",
                body: user,
                responseHandler: (response) => response.text(),
            }),
        }),
        getLoggedUser: build.query<ILoggedUser, void>({
            query: () => ({
                url: "http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/usuario/usuario-logado",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useAuthLoginMutation, useGetLoggedUserQuery } =
    authenticationSlice;

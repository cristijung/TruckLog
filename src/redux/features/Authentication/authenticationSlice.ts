import { ILoggedUser } from "../../../utils/interfaces/IAuthentication.";
import { IUser } from "../../../utils/interfaces/IUser";
import { apiSlice } from "../../rootReducer";

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
                url: "http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/auth/usuario-logado",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),
    }),
});

export const { useAuthLoginMutation, useGetLoggedUserQuery } =
    authenticationSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../../../utils/interfaces/IUser';
import { ILoggedUser } from '../../../utils/interfaces/IAuthentication.';

export const apiSlice = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authLogin: builder.mutation<{ data: string }, IUser>({
      query: (user) => ({
        url: '/auth',
        method: 'POST',
        body: user,
        responseHandler: (response) => response.json(),
      }),
    }),

    getLoggedUser: builder.query<ILoggedUser, void>({
      query: () => ({
        url: 'usuario/usuario-logado',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAuthLoginMutation, useGetLoggedUserQuery } = apiSlice;

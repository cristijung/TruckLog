import { IUser } from '../../../utils/interfaces/IUser';
import { ILoggedUser } from '../../../utils/interfaces/IAuthentication.';
import { apiSlice } from '../../apiSlice';

export const getToken = (): string => {
  return localStorage.getItem('token') || '';
};

const Authentication = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    authLogin: build.mutation<string, IUser>({
      query: (user) => ({
        url: `/auth`,
        method: 'POST',
        body: user,
        responseHandler: (response) => response.text(),
      }),
    }),
    getLoggedUser: build.query<ILoggedUser, void>({
      query: () => ({
        url: `/auth/usuario-logado`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useAuthLoginMutation, useGetLoggedUserQuery } = Authentication;

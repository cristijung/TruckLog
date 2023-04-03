import { apiSlice } from "../../rootReducer";
import { api } from "../../../utils/api";
import {
    ICaminhao,
    ICaminhaoCreate,
    ICaminhaoEdit,
} from "../../../utils/interfaces/ITruckAPI";

const token = localStorage.getItem("token");

// const apiSliceWithTag = apiSlice.enhanceEndpoints({
//     addTagTypes: ["truck"],
// });

const routeSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTruck: build.query<ICaminhao[], void>({
            query: () => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/caminhao`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        addTruck: build.mutation<ICaminhaoCreate, ICaminhaoCreate>({
            query: (caminhao) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/caminhao`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: caminhao,
            }),
        }),
        editTruck: build.mutation<ICaminhaoEdit, ICaminhaoEdit>({
            query: (caminhao) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/caminhao/abastecer?idCaminhao=${caminhao.idCaminhao}&Quantidade%20de%20gasolina=${caminhao.gas}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        deleteTruck: build.mutation<number, number>({
            query: (idCaminhao) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/caminhao?idCaminhao=${idCaminhao}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    useGetTruckQuery,
    useAddTruckMutation,
    useEditTruckMutation,
    useDeleteTruckMutation,
} = routeSlice;

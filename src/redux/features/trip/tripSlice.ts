import { apiSlice } from "../../rootReducer";
import { api } from "../../../utils/api";
import {
    ITrip,
    IAddTrip,
    IEditTrip,
    IDeleteTrip,
} from "../../../utils/interfaces/ITripAPI";

const token = localStorage.getItem("token");

export const tripSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTrips: build.query<ITrip[], void>({
            query: () => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/viagem`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        addTrips: build.mutation<IAddTrip, any>({
            query: (data) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/viagem?idMotorista=${data.idMotorista}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data.viagem,
            }),
        }),
        editTrips: build.mutation<IEditTrip, any>({
            query: (data) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/viagem?idMotorista=${data.idMotorista}&idViagem=${data.idViagem}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data.data,
            }),
        }),
        deleteTrip: build.mutation<IDeleteTrip, any>({
            query: (data) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/viagem?idMotorista=${data.idMotorista}&idViagem=${data.idViagem}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    useGetTripsQuery,
    useEditTripsMutation,
    useDeleteTripMutation,
    useAddTripsMutation,
} = tripSlice;

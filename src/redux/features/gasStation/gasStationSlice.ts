import { apiSlice } from "../../rootReducer";
import { api } from "../../../utils/api";
import {
    IgetGasStation,
    IFormRespose,
} from "../../../utils/interfaces/IGasStationAPI";

const token = localStorage.getItem("token");
const gasStationSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getGasStation: build.query<IgetGasStation[], void>({
            query: () => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        addGasStation: build.mutation<IFormRespose, void>({
            query: (gasStation) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto`,
                method: "Post",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: gasStation,
            }),
        }),
    }),
});

export const { useGetGasStationQuery, useAddGasStationMutation } =
    gasStationSlice;

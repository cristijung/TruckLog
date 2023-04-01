import { apiSlice } from "../../rootReducer";
import { api } from "../../../utils/api";
import {
    IgetGasStation,
    IFormRespose,
    IeditGasStation,
} from "../../../utils/interfaces/IGasStationAPI";

const token = localStorage.getItem("token");

const apiSliceWithTag = apiSlice.enhanceEndpoints({
    addTagTypes: ["gasStations"],
});

const gasStationSlice = apiSliceWithTag.injectEndpoints({
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
        addGasStation: build.mutation<IFormRespose, IFormRespose>({
            query: (gasStation) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: gasStation,
            }),
        }),
        editGasStation: build.mutation<IeditGasStation, IeditGasStation>({
            query: (gasStation) => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/posto${gasStation.id}`,
                method: "PUT",
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

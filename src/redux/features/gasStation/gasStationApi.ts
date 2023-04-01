import { apiSlice } from "../../rootReducer";
import { api } from "../../../utils/api";

const token = localStorage.getItem("token");
const gasStationSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getGasStation: build.query<any, any>({
            query: () => ({
                url: `http://vemser-dbc.dbccompany.com.br:39000/lluuccaass88/vemser-trabalho-final/postos`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const { useGetGasStationQuery } = gasStationSlice;

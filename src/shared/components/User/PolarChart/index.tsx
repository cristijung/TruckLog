import {
    Chart as ChartJS,
    PolarAreaController,
    RadialLinearScale,
} from "chart.js";

import { PolarArea } from "react-chartjs-2";
import { useGetTripsQuery } from "../../../../redux/features/trip/tripSlice";
import { useGetGasStationQuery } from "../../../../redux/features/gasStation/gasStationSlice";
import { useGetTruckQuery } from "../../../../redux/features/truck/truckSlice";
import { useGetDriversQuery } from "../../../../redux/features/role/roleSlice";
import { useEffect, useState } from "react";

ChartJS.register(PolarAreaController, RadialLinearScale);

export function PolarAreaChart() {
    const { data: trips } = useGetTripsQuery();
    const { data: gasStation } = useGetGasStationQuery();
    const { data: trucks } = useGetTruckQuery();
    const { data: drivers } = useGetDriversQuery(0);

    const [dataInfo, setDataInfo] = useState({
        trips: 0,
        gasStation: 0,
        trucks: 0,
        drivers: 0,
    });

    useEffect(() => {
        if (trips && gasStation && trucks && drivers) {
            setDataInfo({
                trips: trips.length,
                gasStation: gasStation.length,
                trucks: trucks.length,
                drivers: drivers.length,
            });
        }
    }, [trips, gasStation, trucks, drivers]);

    const data = {
        labels: ["Viagens", "Postos", "Caminhões", "Motoristas"],
        datasets: [
            {
                label: "Dados",
                data: [
                    dataInfo.trips,
                    dataInfo.gasStation,
                    dataInfo.trucks,
                    dataInfo.drivers,
                ],
                backgroundColor: ["#e3f9e7", "#3cbd96", "#116655", "#204945"],
            },
        ],
    };

    return <PolarArea data={data} />;
}

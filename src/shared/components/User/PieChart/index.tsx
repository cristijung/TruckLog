import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

import { useGetDriversQuery } from "../../../../redux/features/role/roleSlice";
import { useEffect, useState } from "react";

export function PieChart() {
    const [motoristasDisponiveis, setMotoristasDisponiveis] = useState(0);
    const [motoristasIndisponiveis, setMotoristasIndisponiveis] = useState(0);

    const { data: drivers } = useGetDriversQuery(0);

    useEffect(() => {
        if (drivers) {
            setMotoristasDisponiveis(
                drivers.filter((motorista) => motorista.status === "ATIVO")
                    .length
            );
            setMotoristasIndisponiveis(
                drivers.filter((motorista) => motorista.status !== "ATIVO")
                    .length
            );
        }
    }, [drivers]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    font: {
                        family: "'Poppins', sans-serif",
                    },
                },
            },
            title: {
                display: true,
                text: "Viagens nos últimos 6 dias",
                font: {
                    size: 18,
                    family: "'Poppins', sans-serif",
                    color: "#000000",
                },
            },
        },
    };

    const data = {
        labels: ["Disponíveis", "Não disponíveis"],
        datasets: [
            {
                label: "quantidade de motoristas",
                data: [motoristasDisponiveis, motoristasIndisponiveis],
                backgroundColor: [
                    "rgb(75, 181, 67, 0.6)",
                    "rgb(231, 76, 60, 0.6)",
                ],
                borderColor: ["#4BB543", "#e74c3c"],
                borderWidth: 1,
            },
        ],
    };

    return <Pie options={options} data={data} />;
}

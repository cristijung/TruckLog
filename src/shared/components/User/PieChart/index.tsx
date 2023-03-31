import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
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
            text: "Relação de motoristas disponíveis",
            font: {
                size: 18,
                family: "'Poppins', sans-serif",
                color: "#000000",
            },
        },
    },
};

export const data = {
    labels: ["Disponíveis", "Não disponíveis"],
    datasets: [
        {
            label: "quantidade de motoristas",
            data: [12, 19],
            backgroundColor: ["rgb(75, 181, 67, 0.4)", "rgb(231, 76, 60, 0.4)"],
            borderColor: ["#4BB543", "#e74c3c"],
            borderWidth: 1,
        },
    ],
};

export function PieChart() {
    return <Pie options={options} data={data} />;
}

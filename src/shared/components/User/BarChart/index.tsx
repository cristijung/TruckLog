import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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
            text: "Viagens nos últimos 6 dias",
            font: {
                size: 18,
                family: "'Poppins', sans-serif",
                color: "#000000",
            },
        },
    },
};

const labels = ["mon", "tue", "wed", "thu", "fry", "sat"];

export const data = {
    labels,
    datasets: [
        {
            label: "Viagens",
            data: [5, 10, 12, 13, 20, 14],
            backgroundColor: "#3cbd96",
        },
    ],
};

export function BarChart() {
    return <Bar options={options} data={data} />;
}

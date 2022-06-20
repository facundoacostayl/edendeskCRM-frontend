import { useState, useEffect } from "react";
import { useAuth } from "../../authContext/AuthProvider";

//CHARTJS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

//Types
import { User } from "../../authContext/types";
import { Operation } from "../../types/operation";

type Props = {
  operationData: Operation[];
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ operationData }: Props) => {
  const { userData } = useAuth();
  const [chartOptions, setChartOptions] = useState({});
  const [chartData, setChartData] = useState({
    labels: [""],
    datasets: [
      {
        label: "",
        data: [0],
        backgroundColor: [""],
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: operationData.map(
        (data) => data.createdAt + "/" + (new Date().getMonth() + 1)
      ),
      datasets: [
        {
          label: "Ingresos",
          data: operationData.map((data) => data.userGain),
          backgroundColor: ["#4f46e5", "#6366f1", "#818cf8", "#a5b4fc"],
        },
        {
          label: "Consumos",
          data: operationData.map((data) => data.userLost),
          backgroundColor: ["#ef4444", "#f87171", "#fca5a5", "#fecaca"],
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: "true",
          text: "Ganancias",
        },
      },
    });
  }, [operationData]);

  return (
    <>
      <Bar options={chartOptions} data={chartData}></Bar>
    </>
  );
};

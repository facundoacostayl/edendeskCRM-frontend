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
  ChartData
} from "chart.js";
import { Bar } from "react-chartjs-2";

//Types
import { User } from "../../authContext/types";

type Props = {
  userData: User;
};

type Operation = {
  id: number;
  year: number;
  month: number;
  userGain: number;
  userLost: number;
};

const operationDataValues: Operation[] = [
  {
    id: 0,
    year: 0,
    month: 0,
    userGain: 0,
    userLost: 0,
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const BarChart = () => {
  const { userData } = useAuth();
  const [chartData, setChartData] = useState({
    labels: [0],
    datasets: [
      {
        label: "",
        data: [0]
      }
    ]
  });
  const [chartOptions, setChartOptions] = useState({})

  const [operationData, setOperationData] =
    useState<Operation[]>(operationDataValues);

  const getOperationData = async () => {
    const id = localStorage.getItem("userId")
    try {
      if (!userData) return;
      const response = await fetch(`http://localhost:4000/user${id}/operation`);
      const parseRes = await response.json();
      setOperationData([parseRes]);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  useEffect(() => {
    getOperationData();
  }, []);

  useEffect(() => {
    setChartData({
      labels: operationData.map(data => data.year),
      datasets: [
        {
          label: "Ingresos",
          data: operationData.map(data => data.userGain)
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: "true",
          text: "Ganancias"
        }
      }
    })
  }, [operationData])

  return <>
    <Bar options={chartOptions} data={chartData}></Bar>
  </>;
};

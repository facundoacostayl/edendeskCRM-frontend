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
import {Operation} from '../../pages/Dashboard';

type Props = {
  operationData: Operation[]
};


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const BarChart = ({operationData}: Props) => {
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

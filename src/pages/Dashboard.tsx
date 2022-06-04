import { useState, useEffect } from "react";
import { useClient } from "../clientsContext/ClientProvider";
import { useAuth } from "../authContext/AuthProvider";

//COMPONENTS
import { Sidebar } from "../components";
import { PageContent } from "../ui/pageContent";
import { Card, CardLeftContainer, CardRightContainer } from "../ui/card";
import { SectionBanner } from "../components/SectionBanner";
import { BarChart } from "../components/barChart";

//TYPES
import { Status } from "../types";
import { User } from "../authContext/types";
import { ChartData } from "chart.js";

export type Operation = {
  id: number;
  year: number;
  month: number;
  userGain: number;
  userLost: number;
  dayTransactions?: number
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

export const Dashboard: React.FC = () => {
  const { userData } = useAuth();
  const { getFullClientBalance, totalClientBalance, status, setStatus, clientsQuantity, getClientsQuantity } =
    useClient();

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
    getClientsQuantity();
  }, [])

  const today = new Date();
  const currentDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  useEffect(() => {
    getFullClientBalance();
    setStatus(Status.success);
  }, []);

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Dashboard" />
        <PageContent direction="flex-col" status={status}>
          <div className="w-full md:flex flex-row gap-5">
            <Card margin="my-2">
              <CardLeftContainer>
                <h3 className="font-semibold text-gray-500 text-xl">
                  Transacciones del día
                </h3>
                <p className="text-center font-bold text-indigo-500 text-4xl md:text-6xl">
                  {operationData[0].dayTransactions}
                </p>
              </CardLeftContainer>
              <CardRightContainer>
                <p className="md:text-xl">Ingresos:</p>
                <span className="font-semibold md:text-xl">${operationData[0].userGain}</span>
                <p className="md:text-xl">Consumos:</p>
                <span className="font-semibold md:text-xl">${operationData[0].userLost}</span>
              </CardRightContainer>
            </Card>
            <Card>
              <CardLeftContainer>
                <h3 className="font-semibold text-gray-500 md:text-xl">
                  Saldo total
                </h3>
                <p className="text-center font-bold text-indigo-500 text-4xl md:text-6xl">
                  ${totalClientBalance ? totalClientBalance : 0}
                </p>
              </CardLeftContainer>
              <CardRightContainer>
                <p className="md:text-xl">Fecha actual:</p>
                <p className="font-semibold md:text-xl">{currentDate}</p>
              </CardRightContainer>
            </Card>
            <Card margin="my-2">
              <CardLeftContainer>
                <h3 className="font-semibold text-gray-500 md:text-xl">
                  Clientes Totales
                </h3>
                <p className="text-center font-bold text-indigo-500 text-4xl md:text-6xl">
                  {clientsQuantity}
                </p>
              </CardLeftContainer>
            </Card>
          </div>
          <BarChart operationData={operationData}/>
        </PageContent>
      </div>
    </div>
  );
};

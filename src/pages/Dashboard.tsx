import { useState, useEffect } from "react";
import { useClient } from "../clientsContext/ClientProvider";
import { useAuth } from "../authContext/AuthProvider";
import { useChart } from "../chartContext/ChartProvider";

//COMPONENTS
import { Sidebar } from "../components";
import { PageContent } from "../ui/pageContent";
import { Card, CardLeftContainer, CardRightContainer } from "../ui/card";
import { SectionBanner } from "../components/SectionBanner";
import { BarChart } from "../components/barChart";

//TYPES
import { Status } from "../types";

export const Dashboard: React.FC = () => {
  const { getFullClientBalance, totalClientBalance, status, setStatus } =
    useClient();

  const { userData } = useAuth();
  const { getOperationData, operationData } = useChart();

  const today = new Date();
  const currentDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  useEffect(() => {
    getFullClientBalance(userData.id);
    setStatus(Status.success);
  }, []);

  useEffect(() => {
    getOperationData();
  }, []);

  return (
      <div className="md:flex">
        <Sidebar />
        <div className="w-full">
          <SectionBanner sectionName="Dashboard" />
          <PageContent status={status}>
            <Card margin="my-2">
              <CardLeftContainer>
                <h3 className="font-semibold text-gray-500 text-xl">
                  Transacciones del día
                </h3>
                <p className="text-center font-bold text-indigo-500 text-4xl md:text-6xl">
                  4
                </p>
              </CardLeftContainer>
              <CardRightContainer>
                <p className="md:text-xl">Total:</p>
                <span className="font-semibold md:text-xl">$500</span>
              </CardRightContainer>
            </Card>
            <Card>
              <CardLeftContainer>
                <h3 className="font-semibold text-gray-500 md:text-xl">
                  Saldo total
                </h3>
                <p className="text-center font-bold text-indigo-500 text-4xl md:text-6xl">
                  ${totalClientBalance}
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
                  4
                </p>
              </CardLeftContainer>
            </Card>
          </PageContent>
        </div>
      </div>
  );
};

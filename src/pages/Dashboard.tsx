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

export const Dashboard: React.FC = () => {
  const { userData } = useAuth();
  const { getFullClientBalance, totalClientBalance, status, setStatus } =
    useClient();

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
                  4
                </p>
              </CardLeftContainer>
            </Card>
          </div>
          <BarChart />
        </PageContent>
      </div>
    </div>
  );
};

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
import { Operation } from "../types/operation";

const operationDataValues: Operation[] = [
  {
    operationId: 0,
    creationYear: 0,
    creationMonth: 0,
    creationDay: 0,
    userEarnings: 0,
    userLosses: 0,
  },
];

const monthOperationDataValues = {
  userEarnings: 0,
  userLosses: 0,
};

//GET FULL OPERATION DATA <-----------

export const Dashboard: React.FC = () => {
  const { userData, checkAuth } = useAuth();
  const {
    getFullClientBalance,
    status,
    setStatus,
    clientsQuantity,
    getClientsQuantity,
  } = useClient();

  const [todayOperationData, setTodayOperationData] =
    useState<Operation[]>(operationDataValues);

  const [monthOperationData, setMonthOperationData] = useState(
    monthOperationDataValues
  );

  const [operationData, setOperationData] =
    useState<Operation[]>(operationDataValues);

  const [chartDateType, setChartDateType] = useState<string>("");
  const [clientTotalBalance, setClientTotalBalance] =
    useState<Operation["totalSumOfBalances"]>(0);

  const getUserId = localStorage.getItem("userId");

  const getTodayOperationData = async () => {
    try {
      if (!userData) return;
      const response = await fetch(
        `http://localhost:4000/api/2.0/operation/user${getUserId}/today-operation-data`
      );
      const parseRes = await response.json();
      setTodayOperationData([parseRes.data]);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const getMonthOperationData = async () => {
    const body = {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/operation/month${body.month}/year${body.year}/month-operation`
      );

      const parseRes = await response.json();
      setMonthOperationData(parseRes.data);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const getFullOperationData = async () => {
    try {
      if (!userData) return;
      const response = await fetch(
        `http://localhost:4000/api/2.0/operation/user${getUserId}/total-operation-data`
      );

      const parseRes = await response.json();

      setOperationData(parseRes.data);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const getUserTotalBalance = async () => {
    try {
      if (!userData) return;
      const response = await fetch(
        `http://localhost:4000/api/2.0/operation/user${getUserId}/user-total-balance`
      );

      const parseRes = await response.json();

      setClientTotalBalance(parseRes.data);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  useEffect(() => {
    getTodayOperationData();
  }, []);

  useEffect(() => {
    getFullOperationData();
  }, []);

  useEffect(() => {
    getUserTotalBalance();
  }, []);

  useEffect(() => {
    getClientsQuantity();
  }, []);

  useEffect(() => {
    operationData && setStatus(Status.success);
  }, [operationData]);

  const today = new Date();
  const currentDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

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
                  {todayOperationData[0].dayTransactions
                    ? todayOperationData[0].dayTransactions
                    : 0}
                </p>
              </CardLeftContainer>
              <CardRightContainer>
                <p className="md:text-xl">Ingresos:</p>
                <span className="font-semibold md:text-xl">
                  {todayOperationData[0].userEarnings
                    ? new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(todayOperationData[0].userEarnings)
                    : "$0"}
                </span>
                <p className="md:text-xl">Consumos:</p>
                <span className="font-semibold md:text-xl">
                  {todayOperationData[0].userLosses
                    ? new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(todayOperationData[0].userLosses)
                    : "$0"}
                </span>
              </CardRightContainer>
            </Card>
            <Card>
              <CardLeftContainer>
                <h3 className="font-semibold text-gray-500 md:text-xl">
                  Saldo total
                </h3>
                <p className="text-center font-bold text-indigo-500 text-4xl md:text-6xl">
                  {clientTotalBalance
                    ? new Intl.NumberFormat("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      }).format(clientTotalBalance)
                    : 0}
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
          {/*<div className="md:w-5/6 flex items-center justify-end gap-2 mt-5">
            <p className="text-gray-500">Ver por</p>
            <ChartDateSelect onChangeDate={setChartDateType}/>
          </div>*/}
          <div className="md:w-5/6 mt-5">
            <BarChart operationData={operationData} />
          </div>
        </PageContent>
      </div>
    </div>
  );
};

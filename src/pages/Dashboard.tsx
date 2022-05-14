import { useState, useEffect } from "react";
import { useClient } from "../clientsContext/ClientProvider";

//COMPONENTS
import { Sidebar } from "../components";
import { Card, CardLeftContainer, CardRightContainer } from "../ui/card";
import { SectionBanner } from "../components/SectionBanner";

export const Dashboard: React.FC = () => {
  const {
    clientList,
    getClientList,
    getFullClientBalance,
    totalClientBalance,
  } = useClient();

  const today = new Date();
  const currentDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  useEffect(() => {
    getClientList();
    getFullClientBalance();
  }, []);

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Dashboard" />
        <div className="w-[90%] max-w-[1440px] mx-auto md:flex justify-between items-center md:gap-5">
          <Card margin="my-2">
            <CardLeftContainer>
              <h3 className="font-semibold text-gray-500">
                Transacciones del día
              </h3>
              <p className="text-center font-bold text-indigo-500 text-4xl">
                4
              </p>
            </CardLeftContainer>
            <CardRightContainer>
              <p>Total:</p>
              <span>$500</span>
            </CardRightContainer>
          </Card>
          <Card>
            <CardLeftContainer>
              <h3 className="font-semibold text-gray-500">Saldo total</h3>
              <p className="text-center font-bold text-indigo-500 text-4xl">
                {totalClientBalance}
              </p>
            </CardLeftContainer>
            <CardRightContainer>
              <p>Fecha actual:</p>
              <p>{currentDate}</p>
            </CardRightContainer>
          </Card>
          <Card margin="my-2">
            <CardLeftContainer>
              <h3 className="font-semibold text-gray-500">Clientes Totales</h3>
              <p className="text-center font-bold text-indigo-500 text-4xl">
                4
              </p>
            </CardLeftContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

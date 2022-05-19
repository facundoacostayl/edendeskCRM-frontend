import { useState, useEffect } from "react";
import { useClient } from "../clientsContext/ClientProvider";
import {useAuth} from '../authContext/AuthProvider';

//COMPONENTS
import { Sidebar } from "../components";
import { Card, CardLeftContainer, CardRightContainer } from "../ui/card";
import { SectionBanner } from "../components/SectionBanner";

export const Dashboard: React.FC = () => {
  const {
    getFullClientBalance,
    totalClientBalance,
  } = useClient();
  const {userData} = useAuth();

  const today = new Date();
  const currentDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  useEffect(() => {
    getFullClientBalance(userData.id);
  }, []);

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Dashboard" />
        <div className="w-[90%] max-w-[1440px] mx-auto md:flex justify-between items-center md:gap-5">
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
              <h3 className="font-semibold text-gray-500 md:text-xl">Saldo total</h3>
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
              <h3 className="font-semibold text-gray-500 md:text-xl">Clientes Totales</h3>
              <p className="text-center font-bold text-indigo-500 text-4xl md:text-6xl">
                4
              </p>
            </CardLeftContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

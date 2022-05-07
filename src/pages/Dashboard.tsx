import { useState, useEffect } from "react";
import { useClient } from "../clientsContext/ClientProvider";

//CARD COMPONENTS
import { Card, CardLeftContainer, CardRightContainer } from "../ui/card";

export const Dashboard: React.FC = () => {
  const { clientList, getClientList, getFullClientBalance, totalClientBalance } = useClient();
  

  useEffect(() => {
    getClientList()
    getFullClientBalance()
  }, []);

  return (
    <>
      <Card margin="my-2">
        <CardLeftContainer>
          <h3 className="font-semibold text-gray-500">Transacciones del día</h3>
          <p className="text-center font-bold text-indigo-500 text-4xl">4</p>
        </CardLeftContainer>
        <CardRightContainer>
          <p>Total:</p>
          <span>$500</span>
        </CardRightContainer>
      </Card>
      <Card>
        <CardLeftContainer>
          <h3 className="font-semibold text-gray-500">Saldo total</h3>
          <p className="text-center font-bold text-indigo-500 text-4xl">{totalClientBalance}</p>
        </CardLeftContainer>
      </Card>
    </>
  );
};

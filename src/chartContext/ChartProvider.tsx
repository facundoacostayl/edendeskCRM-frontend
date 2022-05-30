import { ChartContext } from "./chartContext";
import { useAuth } from "../authContext/AuthProvider";
import { useState, useContext } from "react";

//Types
import { User } from "../authContext/types";
import { Operation } from "./types";

type Props = {
  children: JSX.Element | JSX.Element[];
};

//useChart custom hook
export const useChart = () => {
    return useContext(ChartContext)
};

export const ChartProvider = ({ children }: Props) => {
  const { userData } = useAuth();
  const [operationData, setOperationData] = useState<Operation>({} as Operation);

  const getOperationData = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/user${userData.id}/operation`
      );

      const parseRes = await response.json();
      setOperationData(parseRes);
      console.log(parseRes);
    } catch (error) {
      error instanceof Error && console.error(error);
    }
  };

  const value = {
    operationData,
    getOperationData
  };

  return (
    <ChartContext.Provider value={value}>{children}</ChartContext.Provider>
  );
};

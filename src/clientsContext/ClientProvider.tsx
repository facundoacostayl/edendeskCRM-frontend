import { ClientContext } from "./ClientContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//TYPES
import { Client } from "./types";
import { User } from "../authContext/types";
import { Status } from "../types";
import { json } from "node:stream/consumers";
import { PaginationArgs } from "../types/pagination";

export const useClient = () => {
  return useContext(ClientContext);
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ClientProvider = ({ children }: Props) => {
  const [clientList, setClientList] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client>({} as Client);
  const [totalClientBalance, setTotalClientBalance] = useState<number>(0);
  const [clientsQuantity, setClientsQuantity] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.init);

  const getClientList = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${id}/all-clients`
      );
      const parseRes = await response.json();
      parseRes && setClientList(parseRes.data);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const getPaginatedClientList = async (
    page: PaginationArgs["page"],
    size: PaginationArgs["size"],
    sortBy: PaginationArgs["sortBy"],
    orderBy: PaginationArgs["orderBy"]
  ) => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${id}/listed-clients/?page=${page}&size=${size}&sortBy=${sortBy}&orderBy=${orderBy}`
      );
      const parseRes = await response.json();
      if (parseRes) {
        setClientList(parseRes.data.paginatedValues);
        setClientsQuantity(parseRes.data.allValues);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const getClient = async (
    userId: User["id"],
    clientId: Client["clientId"]
  ) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${userId}/client${clientId}`
      );

      const parseRes = await response.json();

      setCurrentClient(parseRes.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const addClient = async (
    firstName: Client["firstName"],
    lastName: Client["lastName"],
    tel: Client["tel"]
  ) => {
    const id = localStorage.getItem("userId");
    const body = {
      firstName,
      lastName,
      tel,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${id}/new-client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (!parseRes.data) {
        throw new Error(parseRes.message);
      }

      toast.success("Cliente añadido con exito");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const updateClient = async (
    clientId: Client["clientId"],
    amount: number,
    operation: string,
    currentPage: number
  ) => {
    try {
      const body = { amount };
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${userId}/client${clientId}/${operation}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (!parseRes.data) {
        throw new Error(parseRes.message);
      }

      getPaginatedClientList(currentPage, 5, "firstName", "ASC");
      toast.success(parseRes.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const updateClientInfo = async (
    userId: User["id"],
    clientId: Client["clientId"],
    clientValueToEdit: string,
    newClientValue: string
  ) => {
    try {
      const body = { [clientValueToEdit]: newClientValue };

      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${userId}/client${clientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (!parseRes.data) {
        throw new Error(parseRes.message);
      }

      setCurrentClient(parseRes.data);
      toast.success(parseRes.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const deleteClient = async (clientId: Client["clientId"]) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${userId}/client${clientId}`,
        {
          method: "DELETE",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();

      if (!parseRes.data) {
        throw new Error(parseRes.message);
      }

      toast.success(parseRes.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const searchClient = async (name: Client["firstName"]) => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${id}/search-client/?nameSearch=${name}`
      );

      const parseRes = await response.json();
      setClientList(parseRes.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const orderClients = async (orderType: string) => {
    const id = localStorage.getItem("userId");
    /*try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${id}/listed-clients/?page=${page}&size=${size}&sortBy=${sortBy}&orderBy=${orderBy}`
      );

      const parseRes = await response.json();
      setClientList(parseRes);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }*/
  };

  const getFullClientBalance = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/operation/user${id}/user-total-balance`
      );
      const parseRes = await response.json();
      setTotalClientBalance(parseRes.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const getClientsQuantity = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:4000/api/2.0/client/user${userId}/all-clients`
      );
      const parseRes = await response.json();

      setClientsQuantity(parseRes.data.length);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const values = {
    addClient,
    updateClient,
    updateClientInfo,
    deleteClient,
    getClientList,
    getPaginatedClientList,
    clientList,
    getClient,
    currentClient,
    searchClient,
    orderClients,
    getFullClientBalance,
    totalClientBalance,
    getClientsQuantity,
    clientsQuantity,
    status,
    setStatus,
  };

  return (
    <ClientContext.Provider value={values}>{children}</ClientContext.Provider>
  );
};

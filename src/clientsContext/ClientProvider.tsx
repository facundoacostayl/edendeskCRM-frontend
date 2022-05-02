import { ClientContext } from "./ClientContext";
import { useContext, useState } from "react";
import { Client } from "./types";

export const useClient = () => {
  return useContext(ClientContext);
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ClientProvider = ({ children }: Props) => {

  const [clientList, setClientList] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client>({} as Client);

  const getClientList = async () => {
    try {
      const response = await fetch("http://localhost:4000/clientes");

      const parseRes = await response.json();

      setClientList(parseRes)
      console.log(parseRes)
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  }

  const getClient = async(id: Client["clientid"]) => {
    const response = await fetch(`http://localhost:4000/cliente/${id}`);

    const parseRes = await response.json();

    setCurrentClient(parseRes);
  }

  const addClient = async (
    firstname: Client["nombre"],
    lastname: Client["apellido"],
    tel: Client["tel"]
  ) => {
    const body = { nombre: firstname, apellido: lastname, telefono: tel };

    try {
      const response = await fetch("http://localhost:4000/nuevo-cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const updateClient = async (id: Client["clientid"], amount: number, operation: string) => {
    try {
      const body = { amount };

      const response = await fetch(
        `http://localhost:4000/cliente/${id}/${operation}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();
      setClientList(parseRes)
      console.log(parseRes);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const searchClient = async(name: Client["nombre"]) => {
    try{
      const response = await fetch(`http://localhost:4000/cliente/?name=${name}`)

      const parseRes = await response.json();
      setClientList(parseRes)
      console.log(parseRes)
    }catch(error){
      error instanceof Error && console.error(error.message)
    }
  }

  const orderClients = async(orderType: string) => {
    try{
      const response = await fetch(`http://localhost:4000/cliente/ordenar-por-${orderType}`);

      const parseRes = await response.json();
      setClientList(parseRes);
      console.log(parseRes);
    }catch(error){
      error instanceof Error && console.error(error.message)
    }
  }

  const values = {
    addClient,
    updateClient,
    getClientList,
    clientList,
    getClient,
    currentClient,
    searchClient,
    orderClients
  };

  return (
    <ClientContext.Provider value={values}>{children}</ClientContext.Provider>
  );
};

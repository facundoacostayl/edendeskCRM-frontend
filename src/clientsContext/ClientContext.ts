import React, { createContext } from "react";
import { Client } from "./types";
import { PaginationArgs } from "../types/pagination";
import { User } from "../authContext/types";
import { Status } from "../types";

type ClientContextProps = {
  addClient: (
    firstname: Client["firstName"],
    lastname: Client["lastName"],
    tel: Client["tel"]
  ) => Promise<void>;
  updateClient: (
    id: Client["clientId"],
    amount: number,
    operation: string
  ) => Promise<void>;
  updateClientInfo: (
    id: Client["clientId"],
    clientValueToEdit: string,
    newClientValue: string
  ) => Promise<void>;
  getClientList: VoidFunction;
  getPaginatedClientList: (
    page: PaginationArgs["page"],
    size: PaginationArgs["size"],
    sortBy: PaginationArgs["sortBy"],
    orderBy: PaginationArgs["orderBy"]
  ) => Promise<void>;
  clientList: Client[];
  searchClient: (name: Client["firstName"]) => Promise<void>;
  orderClients: (orderType: string) => Promise<void>;
  getClient: (id: Client["clientId"]) => Promise<void>;
  currentClient: Client;
  deleteClient: (id: Client["clientId"]) => Promise<void>;
  getFullClientBalance: () => Promise<void>;
  totalClientBalance: number;
  getClientsQuantity: VoidFunction;
  clientsQuantity: number;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const ClientContext = createContext<ClientContextProps>(
  {} as ClientContextProps
);

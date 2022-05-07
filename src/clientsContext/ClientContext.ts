import {createContext} from 'react';
import {Client} from './types';

type ClientContextProps = {
    addClient: (firstname: Client["nombre"], lastname:Client["apellido"], telefono: Client["telefono"]) => Promise<void>,
    updateClient: (id: Client["clientid"], amount: number, operation: string) => Promise<void>,
    updateClientInfo: (id: Client["clientid"], clientValueToEdit: string, newClientValue: string) => Promise<void>
    getClientList: () => Promise<void>,
    clientList: Client[],
    searchClient: (name: Client["nombre"]) => Promise<void>,
    orderClients: (orderType: string) => Promise<void>,
    getClient: (id: Client["clientid"]) => Promise<void>,
    currentClient: Client,
    deleteClient: (id: Client["clientid"]) => Promise<void>,
    getFullClientBalance: () => Promise<void>,
    totalClientBalance: number
}

export const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);
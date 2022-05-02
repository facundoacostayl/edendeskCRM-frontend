import {createContext} from 'react';
import {Client} from './types';

type ClientContextProps = {
    addClient: (firstname: Client["nombre"], lastname:Client["apellido"], tel: Client["tel"]) => Promise<void>,
    updateClient: (id: Client["clientid"], amount: number, operation: string) => Promise<void>,
    getClientList: () => Promise<void>,
    clientList: Client[],
    searchClient: (name: Client["nombre"]) => Promise<void>,
    orderClients: (orderType: string) => Promise<void>,
    getClient: (id: Client["clientid"]) => Promise<void>,
    currentClient: Client
}

export const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);
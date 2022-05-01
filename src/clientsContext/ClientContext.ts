import {createContext} from 'react';
import {Client} from './types';

type ClientContextProps = {
    addClient: (firstname: Client["nombre"], lastname:Client["apellido"], tel: Client["tel"]) => Promise<void>,
    updateClient: (id: Client["clientid"], amount: number, operation: string) => Promise<void>,
    getClientList: () => Promise<void>,
    clientList: Client[];
    searchClient: (name: Client["nombre"]) => Promise<void>
}

export const ClientContext = createContext<ClientContextProps>({} as ClientContextProps);
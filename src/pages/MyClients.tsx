//HOOKS
import { useClient } from "../clientsContext/ClientProvider";
import { useEffect, useState } from "react";

//COMPONENTS
import { SectionBanner } from "../components";
import { TextField } from "../ui/form/textField";
import { ClientList } from "../ui/clientList";
import { ClientItem } from "../ui/clientItem";
import { Button } from "../ui/controls/button";

export const MyClients = () => {
  const { clientList, getClientList, searchClient } = useClient();
  const [searchField, setSearchField] = useState<string>("");

  useEffect(() => {
    getClientList();
  }, []);

  useEffect(() => {
    searchClient(searchField)
  }, [searchField])

  const getClientSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {

      setSearchField(e.target.value);

    }, 800);

  };

  return (
    <>
      <SectionBanner sectionName="Mis Clientes"></SectionBanner>
      <div className="py-4 px-2">
        <TextField
          onChange={(e) => getClientSearched(e)}
          autoFocus
          type="text"
          placeholder="Buscar cliente..."
        />
      </div>
      <div className="flex justify-end mb-2 mr-2 gap-2">
        <label className="font-light text-gray-600" htmlFor="">
          ordernar por:
        </label>
        <select className="" name="" id="">
          <option value="A - Z">A - Z</option>
          <option value="Z - A">Z - A</option>
          <option value="Menor saldo primero">Menor saldo</option>
          <option value="Mayor saldo primero">Mayor saldo</option>
        </select>
      </div>
      <ClientList>
        {clientList.map((client) => {
          return (
            <ClientItem key={client.clientid}>
              <p className="w-full font-semibold text-gray-800">
                {client.nombre} {client.apellido}
              </p>
              <p className="w-1/3 font-semibold text-gray-500">
                ${client.saldo}
              </p>
              <div className="w-1/3">
                <Button colorScheme="primary">Editar</Button>
              </div>
            </ClientItem>
          );
        })}
      </ClientList>
    </>
  );
};

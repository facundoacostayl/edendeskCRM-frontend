//HOOKS
import { useClient } from "../clientsContext/ClientProvider";
import { useEffect, useState } from "react";

//COMPONENTS
import { SectionBanner } from "../components";
import { TextField } from "../ui/form/textField";
import { ClientList } from "../ui/clientList";
import { ClientLi}  from "../ui/clientLi";
import { Button } from "../ui/controls/button";

export const MyClients = () => {

  const { clientList, getClientList, searchClient, orderClients } = useClient();
  const [searchField, setSearchField] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  useEffect(() => {
    getClientList();
  }, []);

  useEffect(() => {
    searchClient(searchField);
    setFilterValue("");
  }, [searchField]);


  const getClientSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchField(e.target.value);
    }, 800);
  };

  const onFilterItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    orderClients(e.target.value)
    setFilterValue(e.target.value)
  }

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
        <select onChange={e => onFilterItems(e)} value={filterValue} className="" name="filter" id="filter">
          <option value="nombre-asc">A - Z</option>
          <option value="nombre-desc">Z - A</option>
          <option value="saldo-asc">Menor saldo</option>
          <option value="saldo-desc">Mayor saldo</option>
        </select>
      </div>
      <ClientList>
        {clientList.map((client) => {
          return (
            <ClientLi key={client.clientid}>
              <p className="w-full font-semibold text-gray-800">
                {client.nombre} {client.apellido}
              </p>
              <p className="w-1/3 font-semibold text-gray-500">
                ${client.saldo}
              </p>
              <div className="w-1/3">
                <Button colorScheme="primary">Editar</Button>
              </div>
            </ClientLi>
          );
        })}
      </ClientList>
    </>
  );
};

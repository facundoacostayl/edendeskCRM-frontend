//HOOKS
import { useState, useEffect } from "react";
import { useClient } from "../clientsContext/ClientProvider";

//COMPONENTS
import { SectionBanner } from "../components";
import { Sidebar } from "../components/Sidebar";
import { TextField } from "../ui/form/textField";
import { SearchField } from "../ui/form/searchField";
import { ClientList } from "../ui/clientList";
import { ClientLi } from "../ui/clientLi";
import { OperatorButtons } from "../components/operatorButtons";
import { Modal } from "../ui/modal";
import { ModalFooter } from "../ui/modal";
import { Button } from "../ui/controls/button";

//TYPES
import { Client } from "../clientsContext/types";

interface Form extends React.FormEvent<HTMLFormElement> {
  amount: HTMLInputElement;
}

export const ClientBalance = () => {
  const { getClientList, clientList, updateClient, searchClient } = useClient();

  const [isAdding, setIsAdding] = useState(Boolean);
  const [isModalActive, setIsModalActive] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [clientToUpdate, setClientToUpdate] = useState({
    id: 0,
    nombre: "",
    apellido: "",
  });

  useEffect(() => {
    getClientList();
  }, []);

  useEffect(() => {
    searchClient(searchField);
  }, [searchField]);

  const getClientSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchField(e.target.value);
    }, 800);
  };

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const onUpdateBalance = (e: Form) => {
    e.preventDefault();

    const inputAmount = e.currentTarget.inputAmount;

    clientToUpdate &&
      updateClient(
        clientToUpdate.id,
        parseInt(inputAmount.value),
        isAdding ? "agregar-saldo" : "descontar-saldo"
      );

    setIsModalActive(false);
  };

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        {isModalActive && (
          <Modal onSubmit={onUpdateBalance} onClose={toggleModal}>
            <h2 className="text-center text-gray-600 mb-2 font-semibold">
              {isAdding
                ? "Ingresa el monto a cargar"
                : "Ingresa ultimo consumo"}
            </h2>
            <p>
              Cliente: {clientToUpdate.nombre} {clientToUpdate.apellido}
            </p>
            <TextField
              autoFocus
              type="number"
              placeholder="$"
              name="inputAmount"
            />
            <ModalFooter>
              <Button onClose={toggleModal} colorScheme="secondary">
                Cancelar
              </Button>
              <Button colorScheme="primary">Confirmar</Button>
            </ModalFooter>
          </Modal>
        )}

        <SectionBanner sectionName="Nuevo Saldo" />
        <div className="w-[90%] max-w-[1400px] mx-auto">
          <div className="py-4 px-2">
            <SearchField onSearch={(e) => getClientSearched(e)} />
          </div>
          <ClientList>
            {clientList.map((client) => {
              return (
                <ClientLi key={client.clientid}>
                  <p className="mx-auto font-semibold text-gray-800">
                    {client.nombre} {client.apellido}
                  </p>
                  <p className="mx-auto font-semibold text-gray-500">
                    ${client.saldo}
                  </p>
                  <div className="mx-auto">
                    <OperatorButtons
                      onOpenModal={toggleModal}
                      onOperate={setIsAdding}
                    />
                  </div>
                </ClientLi>
              );
            })}
          </ClientList>
        </div>
      </div>
    </div>
  );
};

//HOOKS
import { useState, useEffect } from "react";
import { useClient } from "../clientsContext/ClientProvider";

//COMPONENTS
import { SectionBanner } from "../components";
import {Sidebar} from '../components/Sidebar';
import { TextField } from "../ui/form/textField";
import { Card, CardLeftContainer } from "../ui/card";
import { OperatorButtons } from "../components/operatorButtons";
import { Modal } from "../ui/modal";
import { ModalFooter } from "../ui/modal";
import { Button } from "../ui/controls/button";

//TYPES
import {Client} from '../clientsContext/types';

interface Form extends React.FormEvent<HTMLFormElement> {
  amount: HTMLInputElement;
}

export const ClientBalance = () => {
  const { getClientList, clientList, updateClient } = useClient();

  const [isAdding, setIsAdding] = useState(Boolean);
  const [isModalActive, setIsModalActive] = useState(false);
  const [clientToUpdate, setClientToUpdate] = useState({
    id: 0,
    nombre: "",
    apellido: ""
  });


  useEffect(() => {
    getClientList();
  }, []);

  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const onUpdateBalance = (e: Form) => {
    e.preventDefault();

    const inputAmount = e.currentTarget.inputAmount;

    clientToUpdate && updateClient(clientToUpdate.id, parseInt(inputAmount.value), isAdding ? "agregar-saldo" : "descontar-saldo");

    setIsModalActive(false);
  };

  return (
    <div className="md:flex">
    <Sidebar/>
    <div className="w-full">
      {isModalActive && (
        <Modal onSubmit={onUpdateBalance} onClose={toggleModal}>
          <h2 className="text-center text-gray-600 mb-2 font-semibold">
            {isAdding ? "Ingresa el monto a cargar" : "Ingresa ultimo consumo"}
          </h2>
          <p>Cliente: {clientToUpdate.nombre} {clientToUpdate.apellido}</p>
          <TextField autoFocus type="number" placeholder="$" name="inputAmount" />
          <ModalFooter>
            <Button onClose={toggleModal} colorScheme="secondary">
              Cancelar
            </Button>
            <Button colorScheme="primary">Confirmar</Button>
          </ModalFooter>
        </Modal>
      )}

      <SectionBanner sectionName="Nuevo Saldo"></SectionBanner>
      <div className="py-4 px-2">
        <TextField autoFocus type="text" placeholder="Buscar cliente..." />
      </div>
      <ul>
        {clientList.map((client)=> {
          return (
            <Card onSetClientId={() => setClientToUpdate({id: client.clientid, nombre: client.nombre, apellido: client.apellido})} key={client.clientid} center="items-center">
              <CardLeftContainer>
                <h3 className="font-semibold text-gray-500">{client.nombre}</h3>
                <p className={`text-center font-bold text-indigo-500 text-xl ${client.saldo < 0 && "text-red-500"}`}>
                  {`$${client.saldo === null ? 0 : client.saldo }`}
                </p>
              </CardLeftContainer>
              <OperatorButtons
                onOpenModal={toggleModal}
                onOperate={setIsAdding}
              />
            </Card>
          );
        })}
      </ul>
    </div>
    </div>
  );
};

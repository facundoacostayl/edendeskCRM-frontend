//HOOKS
import { useClient } from "../clientsContext/ClientProvider";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//COMPONENTS
import { SectionBanner } from "../components";
import { ClientCard } from "../ui/card";
import { InfoLi } from "../ui/infoLi";
import { Button } from "../ui/controls/button";
import { Modal } from "../ui/modal";
import { ModalFooter } from "../ui/modal";
import { TextField } from "../ui/form/textField";

export const ClientProfile = () => {
  const { currentClient, getClient, deleteClient, updateClientInfo } =
    useClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isDeletingModalActive, setIsDeletingModalActive] =
    useState<boolean>(false);
  const [isEditingModalActive, setIsEditingModalActive] =
    useState<boolean>(false);
  const [newValueToEdit, setNewValueToEdit] = useState<string>("");
  const [newEditingValue, setNewEditingValue] = useState<string>("");

  useEffect(() => {
    getClient(id ? parseInt(id) : 0);
  }, []);

  const onDeleteClient = () => {
    deleteClient(currentClient.clientid);
    setIsDeletingModalActive(false);
    navigate("/mis-clientes");
  };

  const onConfirmEditClient = () => {
    updateClientInfo(currentClient.clientid, newValueToEdit, newEditingValue);
  };

  return (
    <>
      {/* DELETING MODAL */}
      <SectionBanner sectionName="Perfil de Cliente"></SectionBanner>
      {isDeletingModalActive && (
        <Modal onClose={() => setIsDeletingModalActive(!isDeletingModalActive)}>
          <h2 className="text-center my-2 text-gray-600 text-lg font-semibold">
            Estas seguro de que quieres eliminar este cliente permanentemente?
          </h2>
          <ModalFooter>
            <Button
              onClose={() => setIsDeletingModalActive(false)}
              colorScheme="secondary"
            >
              Cancelar
            </Button>
            <Button
              onConfirmModalSubmit={() => onDeleteClient()}
              colorScheme="primary"
            >
              Confirmar
            </Button>
          </ModalFooter>
        </Modal>
      )}

      {/* EDITING MODAL */}
      {isEditingModalActive && (
        <Modal onClose={() => setIsEditingModalActive(!isEditingModalActive)}>
          <h2 className="text-center my-2 text-gray-600 text-lg font-semibold">
            Editar
          </h2>
          <select
            onChange={(e) => setNewValueToEdit(e.currentTarget.value)}
            id="edit-select"
            name="edit-select"
            className="w-full border border-gray-500 rounded-md font-semibold"
          >
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
            <option value="telefono">Telefono</option>
            <option value="fechaultcarga">Fecha ult. carga</option>
            <option value="montoultcarga">Monto ult. carga</option>
            <option value="fechaultretiro">Fecha ult. retiro</option>
            <option value="montoultretiro">Monto ult. retiro</option>
            <option value="tipodecarga">Tipo de carga</option>
            <option value="sucursal">Sucursal</option>
          </select>
          <div className="p-2 my-2">
            <label htmlFor="new-value-input">Nuevo valor</label>
            <TextField
              onFocus={() =>
                newValueToEdit.length === 0 && setNewValueToEdit("nombre")
              }
              onChange={(e) => setNewEditingValue(e.target.value)}
              id="new-value-input"
              name="new-value-input"
            />
          </div>
          <ModalFooter>
            <Button
              onClose={() => setIsEditingModalActive(false)}
              colorScheme="secondary"
            >
              Cancelar
            </Button>
            <Button
              onConfirmModalSubmit={() => onConfirmEditClient()}
              colorScheme="primary"
            >
              Confirmar
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <div className="w-full my-10 flex flex-col items-center justify-center">
        <ClientCard>
          <div className="w-3/6">
            <InfoLi color="primary">Nombre:</InfoLi>
            <InfoLi color="primary">Apellido:</InfoLi>
            <InfoLi color="primary">Telefono:</InfoLi>
            <InfoLi color="primary">Fecha ult. carga:</InfoLi>
            <InfoLi color="primary">Monto ult. carga:</InfoLi>
            <InfoLi color="primary">Fecha ult. retiro:</InfoLi>
            <InfoLi color="primary">Monto ult. retiro:</InfoLi>
            <InfoLi color="primary">Tipo de carga:</InfoLi>
            <InfoLi color="primary">Sucursal:</InfoLi>
          </div>
          <div className="w-3/6">
            <InfoLi border={true} color="secondary">
              {currentClient.nombre}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.apellido}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.telefono}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.fechaultcarga}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.montoultcarga}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.fechaultretiro}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.montoultretiro}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.tipodecarga}
            </InfoLi>
            <InfoLi border={true} color="secondary">
              {currentClient.sucursal}
            </InfoLi>
          </div>
        </ClientCard>
        <div className="w-[95%] mt-3 flex gap-2">
          <Button
            onOpenModal={() => setIsDeletingModalActive(true)}
            colorScheme="secondary"
          >
            Eliminar
          </Button>
          <Button
            onOpenModal={() => setIsEditingModalActive(true)}
            colorScheme="primary"
          >
            Editar
          </Button>
        </div>
      </div>
    </>
  );
};

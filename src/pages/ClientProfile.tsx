//HOOKS
import { useClient } from "../clientsContext/ClientProvider";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//COMPONENTS
import { SectionBanner } from "../components";
import { Sidebar } from "../components/Sidebar";
import { PageContent } from "../ui/pageContent";
import { ClientCard } from "../ui/card";
import { InfoLi } from "../ui/infoLi";
import { Button } from "../ui/controls/button";
import { Modal } from "../ui/modal";
import { ModalFooter } from "../ui/modal";
import { TextField } from "../ui/form/textField";

//TYPES
import { Status } from "../types";

//ICONS
import { Icon, EditIcon, RemoveIcon } from "../ui/icons";

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
  const [status, setStatus] = useState<Status>(Status.init);

  useEffect(() => {
    getClient(id ? parseInt(id) : 0);
    setStatus(Status.success);
  }, []);

  const onDeleteClient = () => {
    deleteClient(currentClient.clientId);
    setIsDeletingModalActive(false);
    navigate("/mis-clientes");
  };

  const onConfirmEditClient = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateClientInfo(currentClient.clientId, newValueToEdit, newEditingValue);
    setIsEditingModalActive(false);
  };

  useEffect(() => {
    console.log(currentClient.clientId);
  }, [currentClient]);

  return (
    <div className="md:flex">
      {/* DELETING MODAL */}
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Perfil de Cliente"></SectionBanner>
        {isDeletingModalActive && (
          <Modal
            onClose={() => setIsDeletingModalActive(!isDeletingModalActive)}
          >
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
          <Modal
            onSubmit={(e) => onConfirmEditClient(e)}
            onClose={() => setIsEditingModalActive(!isEditingModalActive)}
          >
            <h2 className="text-center my-2 text-gray-600 text-lg font-semibold">
              Editar
            </h2>
            <select
              onChange={(e) => setNewValueToEdit(e.currentTarget.value)}
              id="edit-select"
              name="edit-select"
              className="w-full border border-gray-500 rounded-md font-semibold xl:text-xl xl:p-2"
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
              <Button type="submit" colorScheme="primary">
                Confirmar
              </Button>
            </ModalFooter>
          </Modal>
        )}
        <PageContent status={status} direction="flex-col">
          <div className="w-[95%] max-w-xl flex items-center justify-between">
            <h1 className="m-3 text-md md:text-4xl font-semibold">
              Datos del cliente
            </h1>
            <div className="flex">
              <Button
                onOpenModal={() => setIsEditingModalActive(true)}
                colorScheme="secondary"
              >
                <Icon
                  type={EditIcon}
                  color="text-indigo-500"
                  forButton={true}
                />
              </Button>
              <Button
                onOpenModal={() => setIsDeletingModalActive(true)}
                colorScheme="remove"
              >
                <Icon type={RemoveIcon} color="text-white" forButton={true} />
              </Button>
            </div>
          </div>
          <ClientCard>
            <div className="w-3/6">
              <InfoLi color="primary">Nombre:</InfoLi>
              <InfoLi color="primary">Apellido:</InfoLi>
              <InfoLi color="primary">Telefono:</InfoLi>
              <InfoLi color="primary">Saldo:</InfoLi>
              <InfoLi color="primary">Fecha ult. carga:</InfoLi>
              <InfoLi color="primary">Monto ult. carga:</InfoLi>
              <InfoLi color="primary">Fecha ult. retiro:</InfoLi>
              <InfoLi color="primary">Monto ult. retiro:</InfoLi>
              <InfoLi color="primary">Tipo de carga:</InfoLi>
              <InfoLi color="primary">Sucursal:</InfoLi>
            </div>
            <div className="w-3/6">
              <InfoLi color="secondary">{currentClient.firstName}</InfoLi>
              <InfoLi color="secondary">{currentClient.lastName}</InfoLi>
              <InfoLi color="secondary">{currentClient.tel}</InfoLi>
              <InfoLi color="secondary">{currentClient.balance}</InfoLi>
              <InfoLi color="secondary">{currentClient.lastAddDate}</InfoLi>
              <InfoLi color="secondary">{currentClient.lastAddAmount}</InfoLi>
              <InfoLi color="secondary">
                {currentClient.lastWithdrawDate}
              </InfoLi>
              <InfoLi color="secondary">
                {currentClient.lastWithdrawAmount}
              </InfoLi>
              <InfoLi color="secondary">{currentClient.addType}</InfoLi>
              <InfoLi color="secondary">{currentClient.branch}</InfoLi>
            </div>
          </ClientCard>
        </PageContent>
      </div>
    </div>
  );
};

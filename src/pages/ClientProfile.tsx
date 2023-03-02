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
  const { userId, clientId } = useParams();
  const navigate = useNavigate();

  const [isDeletingModalActive, setIsDeletingModalActive] =
    useState<boolean>(false);
  const [isEditingModalActive, setIsEditingModalActive] =
    useState<boolean>(false);
  const [newValueToEdit, setNewValueToEdit] = useState<string>("");
  const [newEditingValue, setNewEditingValue] = useState<string>("");
  const [inputMaxLength, setInputMaxLength] = useState<number>(25);
  const [inputMinLength, setInputMinLength] = useState<number>(8);
  const [status, setStatus] = useState<Status>(Status.init);
  const getUserId = localStorage.getItem("userId");

  useEffect(() => {
    getClient(userId ? parseInt(userId) : 0, clientId ? parseInt(clientId) : 0);
    setStatus(Status.success);
  }, []);

  useEffect(() => {
    setNewEditingValue("");
  }, [newValueToEdit, isEditingModalActive]);

  const sanitizeValue = (value: string) => {
    let newValue = "";

    newValue = value.replace(/[^a-zA-Z\s]/g, "");

    if (newValue.length > 0) return newValue;
    return value;
  };

  const onNewEditingValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = e.target.value;
    let cleanValue = "";
    if (
      newValueToEdit !== "tel" &&
      newValueToEdit !== "lastAddDate" &&
      newValueToEdit !== "lastAddAmount" &&
      newValueToEdit !== "lastWithdrawDate" &&
      newValueToEdit !== "lastWithdrawAmount"
    ) {
      cleanValue = sanitizeValue(eventValue);
      setNewEditingValue(cleanValue);
      setInputMaxLength(25);
      return;
    }
    setNewEditingValue(eventValue);
    setInputMaxLength(15);
    newValueToEdit === "lastAddAmount" ||
    newValueToEdit === "lastWithdrawAmount"
      ? setInputMinLength(1)
      : setInputMinLength(4);
  };

  const onDeleteClient = () => {
    deleteClient(currentClient.clientId);
    setIsDeletingModalActive(false);
    navigate("/mis-clientes");
  };

  const onConfirmEditClient = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateClientInfo(
      getUserId ? parseInt(getUserId) : 0,
      currentClient.clientId,
      newValueToEdit,
      newEditingValue
    );
    setIsEditingModalActive(false);
    setNewEditingValue("");
  };

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
              <option value="firstName">Nombre</option>
              <option value="lastName">Apellido</option>
              <option value="tel">Telefono</option>
              <option value="lastAddDate">Fecha ult. carga</option>
              <option value="lastAddAmount">Monto ult. carga</option>
              <option value="lastWithdrawDate">Fecha ult. retiro</option>
              <option value="lastWithdrawAmount">Monto ult. retiro</option>
              <option value="addType">Tipo de carga</option>
              <option value="branch">Sucursal</option>
            </select>
            <div className="p-2 my-2">
              <label htmlFor="new-value-input">Nuevo valor</label>
              <TextField
                onFocus={() =>
                  newValueToEdit.length === 0 && setNewValueToEdit("firstName")
                }
                onChange={(e) => onNewEditingValue(e)}
                value={newEditingValue}
                id="new-value-input"
                name="new-value-input"
                maxLength={inputMaxLength}
                minLength={inputMinLength}
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

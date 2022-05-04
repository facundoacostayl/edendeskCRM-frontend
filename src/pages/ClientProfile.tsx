//HOOKS
import { useClient } from "../clientsContext/ClientProvider";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//COMPONENTS
import { SectionBanner } from "../components";
import { ClientCard } from "../ui/card";
import { InfoLi } from "../ui/infoLi";
import { Button } from "../ui/controls/button";
import { Modal } from "../ui/modal";
import { ModalFooter } from "../ui/modal";

export const ClientProfile = () => {
  const { currentClient, getClient, deleteClient } = useClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  useEffect(() => {
    getClient(id ? parseInt(id) : 0);
  }, []);

  const onDeleteClient = () => {
    deleteClient(currentClient.clientid);
    setIsModalActive(false);
    navigate("/mis-clientes")
  }

  return (
    <>
      <SectionBanner sectionName="Perfil de Cliente"></SectionBanner>
      {isModalActive && <Modal onClose={() => setIsModalActive(!isModalActive)}>
        <h2 className="text-center my-2 text-gray-600 text-lg font-semibold">
          Estas seguro de que quieres eliminar este cliente permanentemente?
        </h2>
        <ModalFooter>
          <Button onClose={() => setIsModalActive(false)} colorScheme="secondary">Cancelar</Button>
          <Button onDeleteClient={() => onDeleteClient()} colorScheme="primary">Confirmar</Button>
        </ModalFooter>
      </Modal>}
      <div className="w-full my-10 flex flex-col items-center justify-center">
        <ClientCard>
          <div className="">
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
          <div className="">
            <InfoLi color="secondary">{currentClient.nombre}</InfoLi>
            <InfoLi color="secondary">{currentClient.apellido}</InfoLi>
            <InfoLi color="secondary">{currentClient.telefono}</InfoLi>
            <InfoLi color="secondary">{currentClient.fechaultcarga}</InfoLi>
            <InfoLi color="secondary">{currentClient.montoultcarga}</InfoLi>
            <InfoLi color="secondary">{currentClient.fechaultretiro}</InfoLi>
            <InfoLi color="secondary">{currentClient.montoultretiro}</InfoLi>
            <InfoLi color="secondary">{currentClient.tipodecarga}</InfoLi>
            <InfoLi color="secondary">{currentClient.sucursal}</InfoLi>
          </div>
        </ClientCard>
        <div className="w-[95%] mt-3 flex gap-2">
          <Button onOpenModal={() => setIsModalActive(true)} colorScheme="secondary">Eliminar</Button>
          <Button colorScheme="primary">Editar</Button>
        </div>
      </div>
    </>
  );
};

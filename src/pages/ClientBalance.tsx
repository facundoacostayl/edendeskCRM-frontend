//HOOKS
import { useState, useEffect, useRef } from "react";
import { useClient } from "../clientsContext/ClientProvider";
import { useAuth } from "../authContext/AuthProvider";
import { Link } from "react-router-dom";

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

//Paginate
import ReactPaginate from "react-paginate";

interface Form extends React.FormEvent<HTMLFormElement> {
  amount: HTMLInputElement;
}

export const ClientBalance = () => {
  const { getClientList, clientList, updateClient, searchClient } = useClient();

  const [isAdding, setIsAdding] = useState(Boolean);
  const [isModalActive, setIsModalActive] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [clientToUpdate, setClientToUpdate] = useState({
    id: 0,
    nombre: "",
    apellido: "",
  });
  const firstRun = useRef(true);

  useEffect(() => {
    getClientList();
  }, []);

  useEffect(() => {
    if (!firstRun.current) {
      searchField.length > 0 ? searchClient(searchField) : getClientList();
    }
    firstRun.current = false;
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

  const clientsPerPage = 5;
  const pagesVisited = clientsPerPage * currentPage;
  const clients = [...clientList];
  const clientsDisplayed = clients
    .slice(pagesVisited, pagesVisited + clientsPerPage)
    .map((client) => {
      return (
        <div
          key={client.clientid}
          onClick={() =>
            setClientToUpdate({
              id: client.clientid,
              nombre: client.nombre,
              apellido: client.apellido,
            })
          }
        >
          <ClientLi>
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
        </div>
      );
    });

  const pageCount = Math.ceil(clientList.length / clientsPerPage);

  const changePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        {isModalActive && (
          <Modal onSubmit={onUpdateBalance} onClose={toggleModal}>
            <h2 className="text-center text-gray-600 mb-2 md:mb-5 font-semibold md:text-2xl">
              {isAdding
                ? "Ingresa el monto a cargar"
                : "Ingresa ultimo consumo"}
            </h2>
            <p className="text-lg font-semibold mb-5">
              <span className="text-xl font-normal">Cliente:</span>{" "}
              {clientToUpdate.nombre} {clientToUpdate.apellido}
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
          <SearchField onSearch={(e) => getClientSearched(e)} />

          {clientList.length > 0 ? (
            <ClientList>{clientsDisplayed}</ClientList>
          ) : (
            <p className="text-center text-base my-10 text-gray-500">
              Todavía no tienes clientes. Comienza a añadirlos{" "}
              <Link to="/nuevo-cliente" className="text-indigo-500">
                aquí
              </Link>
              !
            </p>
          )}
          <ReactPaginate
            breakLabel="..."
            pageRangeDisplayed={5}
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="flex gap-5 justify-center items-center py-5"
            previousLinkClassName="text-lg font-semibold text-indigo-500 border border-gray-200 shadow-md p-2 rounded-full"
            nextLinkClassName="text-lg font-semibold text-indigo-500 border border-gray-200 shadow-md p-2 rounded-full"
            disabledClassName="hidden"
            activeClassName="text-lg font-semibold text-white bg-indigo-500 p-1 px-3 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

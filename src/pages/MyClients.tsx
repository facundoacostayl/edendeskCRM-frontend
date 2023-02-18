//HOOKS
import { useAuth } from "../authContext/AuthProvider";
import { useClient } from "../clientsContext/ClientProvider";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//COMPONENTS
import { SectionBanner } from "../components";
import { Sidebar } from "../components/Sidebar";
import { PageContent } from "../ui/pageContent";
import { TextField } from "../ui/form/textField";
import { SearchField } from "../ui/form/searchField";
import { ClientList } from "../ui/clientList";
import { ClientLi } from "../ui/clientLi";
import { Button } from "../ui/controls/button";

//TYPES
import { Status } from "../types";

//Paginate
import ReactPaginate from "react-paginate";

export const MyClients = () => {
  const { userData } = useAuth();
  const {
    clientList,
    getClientList,
    searchClient,
    orderClients,
    status,
    setStatus,
  } = useClient();
  const [searchField, setSearchField] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const firstRun = useRef(true);

  const clientsPerPage = 5;
  const pagesVisited = clientsPerPage * currentPage;
  const clients = [...clientList];
  const clientsDisplayed = clients
    .slice(pagesVisited, pagesVisited + clientsPerPage)
    .map((client) => {
      return (
        <ClientLi key={client.clientId}>
          <p className="mx-auto font-semibold text-gray-800">
            {client.firstName} {client.lastName}
          </p>
          <p className="mx-auto font-semibold text-gray-500">
            ${client.balance}
          </p>
          <div className="mx-auto">
            <Link to={`/mis-clientes/cliente/${client.clientId}`}>
              <Button colorScheme="primary">Editar</Button>
            </Link>
          </div>
        </ClientLi>
      );
    });

  const pageCount = Math.ceil(clientList.length / clientsPerPage);

  const changePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  useEffect(() => {
    getClientList();
    setStatus(Status.success);
  }, []);

  useEffect(() => {
    if (!firstRun.current) {
      clientList.length > 0 ? searchClient(searchField) : getClientList();
      setFilterValue("");
    }
    firstRun.current = false;
  }, [searchField]);

  const getClientSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setSearchField(e.target.value);
    }, 800);
  };

  const onFilterItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    orderClients(e.target.value);
    setFilterValue(e.target.value);
  };

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Mis Clientes"></SectionBanner>
        <PageContent status={status} direction="flex-col">
          <SearchField onSearch={(e) => getClientSearched(e)} />
          <div className="w-full flex justify-end mb-2 gap-2">
            <label className="font-light text-gray-600" htmlFor="">
              ordernar por:
            </label>
            <select
              onChange={(e) => onFilterItems(e)}
              value={filterValue}
              className="w-2/6 md:w-1/12"
              name="filter"
              id="filter"
            >
              <option value="nombre-asc">A - Z</option>
              <option value="nombre-desc">Z - A</option>
              <option value="saldo-asc">Menor saldo</option>
              <option value="saldo-desc">Mayor saldo</option>
            </select>
          </div>
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
        </PageContent>
      </div>
    </div>
  );
};

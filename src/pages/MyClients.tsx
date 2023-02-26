//HOOKS
import { useAuth } from "../authContext/AuthProvider";
import { useClient } from "../clientsContext/ClientProvider";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//COMPONENTS
import { SectionBanner } from "../components";
import { Sidebar } from "../components/Sidebar";
import { PageContent } from "../ui/pageContent";
import { SearchField } from "../ui/form/searchField";
import { ClientList } from "../ui/clientList";
import { ClientLi } from "../ui/clientLi";
import { Button } from "../ui/controls/button";

//TYPES
import { Status } from "../types";
import { PaginationArgs } from "../types/pagination";

//Paginate
import ReactPaginate from "react-paginate";

export const MyClients = () => {
  const { checkAuth } = useAuth();
  const {
    clientList,
    getPaginatedClientList,
    clientsQuantity,
    searchClient,
    status,
    setStatus,
  } = useClient();
  const [searchField, setSearchField] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("firstName ASC");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const firstRun = useRef(true);
  const getUserId = localStorage.getItem("userId");

  const splitFilterValue = (value: string) => value.split(" ");
  const splittedFilterValues = splitFilterValue(filterValue);
  const sortByValue = splittedFilterValues[0];
  const orderByValue = splittedFilterValues[1];

  const clientsPerPage = 5;
  const pagesVisited = clientsPerPage * currentPage;
  const clients = [...clientList];
  const clientsDisplayed = clients.map((client) => {
    return (
      <ClientLi key={client.clientId}>
        <p className="mx-auto font-semibold text-gray-800">
          {client.firstName} {client.lastName}
        </p>
        <p className="mx-auto font-semibold text-gray-500">${client.balance}</p>
        <div className="mx-auto">
          <Link to={`/mis-clientes/user${getUserId}/cliente${client.clientId}`}>
            <Button colorScheme="primary">Editar</Button>
          </Link>
        </div>
      </ClientLi>
    );
  });

  const pageCount = Math.ceil(clientsQuantity / clientsPerPage);

  const changePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  useEffect(() => {
    getPaginatedClientList(
      /*page*/ currentPage + 1,
      /*size*/ clientsPerPage,
      /*sortBy*/ sortByValue as PaginationArgs["sortBy"],
      /*orderBy*/ orderByValue as PaginationArgs["orderBy"]
    );
    setStatus(Status.success);
  }, [currentPage]);

  useEffect(() => {
    if (!firstRun.current) {
      if (clientList.length > 0 && searchField.length !== 0) {
        searchClient(searchField);
        setFilterValue("filterName ASC");
        return;
      }

      getPaginatedClientList(
        /*page*/ 1,
        /*size*/ clientsPerPage,
        /*sortBy*/ "firstName",
        /*orderBy*/ "ASC"
      );
    }
    firstRun.current = false;
  }, [searchField]);

  const sanitizeValue = (value: string) => {
    let newValue = "";
    newValue = value.replace(/[^a-zA-Z\s]/g, "");
    console.log(newValue);

    if (newValue.length > 0) return newValue;
    return value;
  };

  const getClientSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const cleanValue = sanitizeValue(e.target.value);
      setSearchField(cleanValue);
    }, 800);
  };

  const onFilterItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const splittedEventValue = splitFilterValue(e.target.value);
    const sortByValue = splittedEventValue[0] as PaginationArgs["sortBy"];
    const orderByValue = splittedEventValue[1] as PaginationArgs["orderBy"];
    getPaginatedClientList(
      currentPage + 1,
      clientsPerPage,
      sortByValue,
      orderByValue
    );
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
              <option value="firstName ASC">A - Z</option>
              <option value="firstName DESC">Z - A</option>
              <option value="balance ASC">Menor saldo</option>
              <option value="balance DESC">Mayor saldo</option>
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

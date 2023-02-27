//REACT HOOKS
import { useClient } from "../clientsContext/ClientProvider";
import { useState } from "react";

//COMPONENTS
import { Sidebar } from "../components";
import { SectionBanner } from "../components";
import { AuthForm } from "../ui/form/authForm";
import { TextField } from "../ui/form/textField";
import { Button } from "../ui/controls/button";

//CONTAINER COMPONENT
import { AppContainer } from "../ui/layout/AppContainer";

//UTILS
import { toast } from "react-toastify";

interface Form extends React.FormEvent<HTMLFormElement> {
  firstname: HTMLInputElement;
  lastname: HTMLInputElement;
  tel: HTMLInputElement;
}

export const NewClient = () => {
  const { addClient } = useClient();

  const [clientData, setClientData] = useState({
    clientFirstname: "",
    clientLastname: "",
    clientTel: "",
  });

  const sanitizeValue = (value: string, name: string) => {
    let newValue = "";
    if (name === "clientFirstname" || name === "clientLastname") {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
      console.log(`value = ${value} - name = ${name}`);
    }

    if (newValue.length > 0) return newValue;
    return value;
  };

  const onGetInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = sanitizeValue(
      e.currentTarget.value,
      e.currentTarget.name
    );

    console.log(cleanValue);

    setClientData({
      ...clientData,
      [e.currentTarget.name]: cleanValue,
    });
  };

  const onSubmitHandler = (e: Form) => {
    e.preventDefault();

    const firstNameInput = e.currentTarget.clientFirstname;
    const lastNameInput = e.currentTarget.clientLastname;
    const telInput = e.currentTarget.clientLastname;

    const firstName = clientData.clientFirstname;
    const lastName = clientData.clientLastname;
    const tel = clientData.clientTel;

    if (firstName.length <= 0 || lastName.length <= 0 || tel.length <= 0) {
      toast.error("Completa todos los campos");
      return;
    }

    addClient(firstName, lastName, tel.toString());

    firstNameInput.value = "";
    lastNameInput.value = "";
    telInput.value = "";

    setClientData({
      clientFirstname: "",
      clientLastname: "",
      clientTel: "",
    });
  };

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Añadir Cliente" />
        <AppContainer>
          <h1 className="pt-3 pb-4 px-2 text-center text-xl lg:text-3xl font-semibold text-gray-600">
            Ingresa los datos del cliente:
          </h1>
          <AuthForm onSubmit={onSubmitHandler}>
            <label
              className="text-slate-500 font-semibold lg:text-xl mb-1"
              htmlFor="new-client-firstname"
            >
              Nombre
            </label>
            <TextField
              onChange={(e) => onGetInputValues(e)}
              value={clientData.clientFirstname}
              type="text"
              id="new-client-firstname"
              name="clientFirstname"
              placeholder="Juan"
              maxLength={30}
            />
            <div className="my-3">
              <label
                className="text-slate-500 font-semibold lg:text-xl mb-1"
                htmlFor="new-client-lastname"
              >
                Apellido
              </label>
              <TextField
                onChange={(e) => onGetInputValues(e)}
                value={clientData.clientLastname}
                type="text"
                id="new-client-lastname"
                name="clientLastname"
                placeholder="Perez"
                maxLength={30}
              />
            </div>
            <div className="my-3">
              <label
                className="text-slate-500 font-semibold lg:text-xl mb-1"
                htmlFor="new-client-tel"
              >
                Telefono
              </label>
              <TextField
                onChange={(e) => onGetInputValues(e)}
                value={clientData.clientTel}
                type="number"
                id="new-client-tel"
                name="clientTel"
                placeholder="01142567891"
                minLength={4}
              />
            </div>
            <div className="my-3 mx-auto">
              <Button colorScheme="primary">Añadir</Button>
            </div>
          </AuthForm>
        </AppContainer>
      </div>
    </div>
  );
};

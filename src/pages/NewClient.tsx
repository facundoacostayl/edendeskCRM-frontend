//REACT HOOKS
import { useClient } from "../clientsContext/ClientProvider";

//COMPONENTS
import { Sidebar } from "../components";
import { SectionBanner } from "../components";
import { AuthForm } from "../ui/form/authForm";
import { TextField } from "../ui/form/textField";
import { Button } from "../ui/controls/button";

//CONTAINER COMPONENT
import { AppContainer } from "../ui/layout/AppContainer";

interface Form extends React.FormEvent<HTMLFormElement> {
  firstname: HTMLInputElement;
  lastname: HTMLInputElement;
  tel: HTMLInputElement;
}

export const NewClient = () => {
  const { addClient } = useClient();

  const onSubmitHandler = (e: Form) => {
    e.preventDefault();

    const nombre = e.currentTarget.clientFirstname;
    const apellido = e.currentTarget.clientLastname;
    const tel = e.currentTarget.clientTel;

    addClient(nombre.value, apellido.value, tel.value.toString());

    nombre.value = "";
    apellido.value = "";
    tel.value = "";
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
                type="number"
                id="new-client-tel"
                name="clientTel"
                placeholder="01142567891"
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

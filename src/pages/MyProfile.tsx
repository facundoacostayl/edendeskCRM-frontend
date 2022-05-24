//HOOKS
import { useState, useEffect } from "react";
import { useAuth } from "../authContext/AuthProvider";

import { Sidebar } from "../components/Sidebar";
import { SectionBanner } from "../components";
import { PageContent } from "../ui/pageContent";
import { TextField } from "../ui/form/textField";
import { Button } from "../ui/controls/button";

//TYPES
import { Status } from "../types";

export const MyProfile = () => {
  const { userData } = useAuth();
  const [status, setStatus] = useState<Status>(Status.init);

  useEffect(() => {
    userData && setStatus(Status.success);
  }, []);

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
        <SectionBanner sectionName="Mis Datos" />
        <PageContent status={status}>
          <h2 className="text-2xl font-semibold my-3">Datos del usuario</h2>
          <p>En esta sección puedes ver o editar tus datos personales</p>
          <div className="absolute left-0 w-full bg-gray-100 my-3 py-5 px-5">
            <form>
              <div className="mb-3">
                <label htmlFor="userName-info">Nombre completo</label>
                <TextField disabled placeholder="Facundo Acosta" />
              </div>
              <div className="mb-5">
                <label htmlFor="userName-info">Correo electrónico</label>
                <TextField disabled placeholder="facundoacostayl@outlook.com" />
              </div>
            </form>

              <h3 className="text-lg font-semibold my-4">Cambiar contraseña</h3>
              <div className="mb-3">
                <label htmlFor="userName-info">Contraseña actual</label>
                <TextField type="password" disabled placeholder="****" />
              </div>
              <div className="mb-5">
                <label htmlFor="userName-info">Nueva contraseña</label>
                <TextField type="password" disabled placeholder="****" />
              </div>
              <div className="flex justify-center">
                <Button colorScheme="secondary">Editar</Button>
              </div>
          </div>
        </PageContent>
      </div>
    </div>
  );
};

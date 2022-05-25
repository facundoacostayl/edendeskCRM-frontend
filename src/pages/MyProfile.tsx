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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setStatus(Status.success);
    console.log(userData);
  }, [userData]);

  return (
    <div className="md:flex">
      <Sidebar />
      <div className="w-full">
      <SectionBanner sectionName="Mis Datos" />
        <PageContent direction="flex-col" status={status}>
          <h2 className="text-2xl font-semibold mt-3">Datos del usuario</h2>
          <div className="w-full my-1 py-1 px-1">
            <div className="py-2">
              <p className="mb-1 text-lg font-semibold text-gray-700">
                {userData.firstname}
              </p>
              <p className="mb-1 text-lg font-semibold text-indigo-500">
                {userData.loginemail}
              </p>
            </div>
            <form>
              <div className="mb-5">
                <label htmlFor="userName-info">Nuevo correo</label>
                <TextField placeholder={userData.loginemail} />
              </div>
            </form>

            <h3 className="text-lg font-semibold my-4">Cambiar contraseña</h3>
            <div className="mb-3">
              <label htmlFor="userName-info">Nueva contraseña</label>
              <TextField type="password" placeholder="*******" />
            </div>
            <div className="mb-5">
              <label htmlFor="userName-info">Repetir contraseña</label>
              <TextField type="password" placeholder="*******" />
            </div>
            <div className="flex justify-center border border-gray-500">
              <Button colorScheme="secondary">Editar</Button>
            </div>
          </div>
        </PageContent>
      </div>
    </div>
  );
};

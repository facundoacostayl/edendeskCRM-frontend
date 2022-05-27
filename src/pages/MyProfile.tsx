//HOOKS
import { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "../authContext/AuthProvider";

import { Sidebar } from "../components/Sidebar";
import { SectionBanner } from "../components";
import { PageContent } from "../ui/pageContent";
import { TextField } from "../ui/form/textField";
import { Button } from "../ui/controls/button";

//TYPES
import { Status } from "../types";
import { User } from "../authContext/types";

interface Form extends React.FormEvent<HTMLFormElement> {
  loginemail: HTMLInputElement;
  password: HTMLInputElement;
}

type UserData = {
  loginemail?: User["loginemail"];
  password?: User["password"];
};

export const MyProfile = () => {
  const { userData } = useAuth();
  const [status, setStatus] = useState<Status>(Status.init);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateUser = async (newUserData: UserData) => {
    try {
      const body = newUserData;
      const id = userData.id;

      const response = await fetch(`http://localhost:4000/user/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      const parseRes = await response.json();
      console.log(parseRes);
    } catch (error) {
      error instanceof Error && console.error(error);
    }
  };

  const onUpdateValue = (e: Form) => {
    e.preventDefault();

    const email = e.currentTarget.loginemail;
    const password = e.currentTarget.password;
    const rPassword = e.currentTarget.rPassword;

    if (!email.value && !password.value) return;

    if (email.value && !password.value) {
      updateUser({ loginemail: email.value });
      email.value = "";
      return;
    }

    if (password.value && !email.value && password.value === rPassword.value) {
      updateUser({password: password.value});
      password.value = "";
      rPassword.value = "";
      return;
    }
  };

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
            <form onSubmit={onUpdateValue}>
              <div className="mb-5">
                <label htmlFor="userName-info">Nuevo correo</label>
                <TextField
                  name="loginemail"
                  placeholder={userData.loginemail}
                />
              </div>

              <h3 className="text-lg font-semibold my-4">Cambiar contraseña</h3>

              <div className="mb-3">
                <label htmlFor="userName-info">Nueva contraseña</label>
                <TextField
                  name="password"
                  type="password"
                  placeholder="*******"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="userName-info">Repetir contraseña</label>
                <TextField
                  name="rPassword"
                  type="password"
                  placeholder="*******"
                />
              </div>
              <div className="w-2/4 mx-auto flex justify-center">
                <Button colorScheme="secondary">Editar</Button>
              </div>
            </form>
          </div>
        </PageContent>
      </div>
    </div>
  );
};

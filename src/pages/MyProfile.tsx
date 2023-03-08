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
import { toast } from "react-toastify";

//UTILS
import { currentUrl } from "../utils/apiUrl";

interface Form extends React.FormEvent<HTMLFormElement> {
  loginemail: HTMLInputElement;
  password: HTMLInputElement;
}

type UserData = {
  loginEmail?: User["loginEmail"];
  password?: User["password"];
};

export const MyProfile = () => {
  const { userData, setUserData } = useAuth();
  const [status, setStatus] = useState<Status>(Status.init);
  const [editUserData, setEditUserData] = useState({
    loginEmail: "",
    password: "",
    rPassword: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const getUserId = localStorage.getItem("userId");

  const updateUser = async (newUserData: UserData) => {
    try {
      const body = newUserData;

      const response = await fetch(`${currentUrl}/api/2.0/user/${getUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!parseRes.data) {
        throw new Error(parseRes.message);
      }

      toast.success(parseRes.message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const onChangeUserEditValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserData({
      ...editUserData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onUpdateValue = (e: Form) => {
    e.preventDefault();

    const validEmail = (loginEmail: string) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginEmail);
    };

    const email = editUserData.loginEmail;
    const password = editUserData.password;
    const rPassword = editUserData.rPassword;

    if (!email && !password) {
      toast.error("No hay datos a editar");
      return;
    }

    if (email && !password) {
      if (!validEmail(email)) {
        toast.error("Escriba un email valido");
        return;
      }
      updateUser({ loginEmail: email });
      setUserData({ ...userData, loginEmail: email });
      setEditUserData({ ...editUserData, loginEmail: "" });
    }

    if (password && !email) {
      if (password !== rPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      updateUser({ password: password });
      setEditUserData({ ...editUserData, password: "", rPassword: "" });
    }

    if (email && password && password === rPassword) {
      if (!validEmail(email)) {
        toast.error("Escriba un email valido");
        return;
      }
      if (password !== rPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }

      updateUser({ loginEmail: email, password: password });
      setUserData({ ...userData, loginEmail: email });
      setEditUserData({ loginEmail: "", password: "", rPassword: "" });
    }
  };

  useEffect(() => {
    setStatus(Status.success);
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
                {userData.firstName}
              </p>
              <p className="mb-1 md:text-lg font-semibold text-indigo-500">
                {userData.loginEmail}
              </p>
            </div>
            <form onSubmit={onUpdateValue}>
              <div className="mb-5">
                <label htmlFor="userName-info">Nuevo correo</label>
                <TextField
                  name="loginEmail"
                  placeholder={userData.loginEmail}
                  maxLength={50}
                  onChange={(e) => onChangeUserEditValues(e)}
                  value={editUserData.loginEmail}
                />
              </div>

              <h3 className="text-lg font-semibold my-4">Cambiar contraseña</h3>

              <div className="mb-3">
                <label htmlFor="userName-info">Nueva contraseña</label>
                <TextField
                  name="password"
                  type="password"
                  placeholder="*******"
                  minLength={8}
                  maxLength={30}
                  onChange={(e) => onChangeUserEditValues(e)}
                  value={editUserData.password}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="userName-info">Repetir contraseña</label>
                <TextField
                  name="rPassword"
                  type="password"
                  placeholder="*******"
                  minLength={8}
                  maxLength={30}
                  onChange={(e) => onChangeUserEditValues(e)}
                  value={editUserData.rPassword}
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

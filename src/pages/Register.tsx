//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../authContext/AuthProvider";

//Components
import { SwitchAuthNav } from "../ui/navbar";
import { Button } from "../ui/controls/button";
import { AuthForm } from "../ui/form/authForm";
import { TextField } from "../ui/form/textField";
import { AuthHero } from "../components/AuthHero";
import { Footer } from "../ui/footer";

//Utils
import { toast } from "react-toastify";

export const Register = () => {
  const { isLoggedIn, signUp } = useAuth();

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const sanitizeValue = (value: string, name: string) => {
    let newValue = "";

    if (name === "userName") {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    if (name === "email") {
      newValue = value.replace(
        /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
        ""
      );
    }

    if (newValue.length > 0) return newValue;
    return value;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = sanitizeValue(
      e.currentTarget.value,
      e.currentTarget.name
    );

    setUserData({
      ...userData,
      [e.currentTarget.name]: cleanValue,
    });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const user = userData.userName;
    const email = userData.email;
    const password = userData.password;

    if (!user || !email || !password) {
      toast.error("Completa todos los campos");
      return;
    }

    signUp(user, email, password);
  };

  return (
    <>
      <div className="w-[95%] md:min-h-[650px] mx-auto">
        <SwitchAuthNav>
          <Link to="/login">
            <Button colorScheme="secondary">Inicia Sesión</Button>
          </Link>
        </SwitchAuthNav>

        <div className="w-full max-w-[1120px] md:min-h-[600px] mx-auto p-2 md:mt-10 md:flex items-center md:gap-10 md:border md:border-gray-200 md:border-none shadow-xl xl:shadow-none">
          <div className="md:w-3/6">
            <AuthHero
              title="Crea tu cuenta"
              subtitle="es gratis ahora y siempre"
            />
            <AuthForm onSubmit={onSubmitHandler}>
              <div className="my-3">
                <label className="text-slate-500 font-semibold" htmlFor="email">
                  Nombre
                </label>
                <TextField
                  onChange={(e) => onChangeHandler(e)}
                  autoFocus
                  value={userData.userName}
                  type="text"
                  name="userName"
                  id="name"
                  maxLength={25}
                />
              </div>
              <div className="my-3">
                <label className="text-slate-500 font-semibold" htmlFor="email">
                  Email
                </label>
                <TextField
                  onChange={(e) => onChangeHandler(e)}
                  value={userData.email}
                  type="email"
                  name="email"
                  id="register-email"
                  maxLength={50}
                />
              </div>
              <div className="my-3">
                <label
                  className="text-slate-500 font-semibold"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <TextField
                  onChange={(e) => onChangeHandler(e)}
                  value={userData.password}
                  type="password"
                  name="password"
                  id="register-password"
                  maxLength={50}
                  minLength={8}
                />
              </div>
              <div className="w-full my-3 flex justify-center">
                <Button colorScheme="primary">Registrarse</Button>
              </div>
            </AuthForm>
          </div>
          <div className="md:w-3/6">
            <div className="w-5/6 md:w-full mx-auto bg-indigo-500 rounded-3xl">
              <img
                className="object-cover"
                src={require("../img/illustrationlogin.png")}
                alt="dashboard"
              />
            </div>
            <div className="text-center my-5">
              <p className="text-gray-800">Ya eres parte del equipo?</p>
              <Link className="text-indigo-500 font-semibold" to="/login">
                Inicia Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer>
        <img className="w-[70px]" src={require("../img/logo.png")} alt="logo" />
        <p className="text-indigo-900">by Facundo Acosta :)</p>
      </Footer>
    </>
  );
};

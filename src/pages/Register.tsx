//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthProvider";

//Components
import { SwitchAuthNav } from "../ui/navbar";
import { Button } from "../ui/controls/button";
import { AuthForm } from "../ui/form/authForm";
import { TextField } from "../ui/form/textField";
import { AuthHero } from "../components/AuthHero";

export const Register = () => {
  const { isLoggedIn, setIsLoggedIn, signUp, checkAuth } = useAuth();

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const user = userData.userName;
    const email = userData.email;
    const password = userData.password;

    signUp(user, email, password);
  };

  return (
    <>
      <SwitchAuthNav>
        <Button colorScheme="secondary">Inicia Sesión</Button>
      </SwitchAuthNav>
      <AuthHero title="Crea tu cuenta" />
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
          />
        </div>
        <div className="my-3">
          <label className="text-slate-500 font-semibold" htmlFor="password">
            Contraseña
          </label>
          <TextField
            onChange={(e) => onChangeHandler(e)}
            value={userData.password}
            type="password"
            name="password"
            id="register-password"
          />
        </div>
        <div className="w-full my-3 mx-auto">
          <Button colorScheme="primary">Registrarse</Button>
        </div>
      </AuthForm>
    </>
  );
};

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
      <div className="w-[95%] md:min-h-[650px] mx-auto">
        <SwitchAuthNav>
          <Link to="/login">
            <Button colorScheme="secondary">Inicia Sesión</Button>
          </Link>
        </SwitchAuthNav>

        <div className="w-full max-w-[1120px] md:min-h-[600px] p-2 md:mt-10 md:flex items-center md:gap-10 md:border md:border-gray-200 shadow-xl">
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
              <Link className="text-indigo-500 font-semibold" to="/login">Inicia Sesión</Link>
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

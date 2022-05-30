//Components
import { SwitchAuthNav } from "../ui/navbar";
import { AuthHero } from "../components/AuthHero";
import { AuthForm } from "../ui/form/authForm";
import { TextField } from "../ui/form/textField";
import { Button } from "../ui/controls/button";
import { Footer } from "../ui/footer";

//Hooks
import { useAuth } from "../authContext/AuthProvider";
import { useToken } from "../authContext/AuthProvider";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const { signIn, isLoggedIn, setIsLoggedIn, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    loginemail: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const email = userData.loginemail;
    const password = userData.password;

    signIn(email, password);
  };

  return (
    <>
      <div className="w-[95%] md:min-h-[650px] mx-auto">
        <SwitchAuthNav>
          <Link to="/registro">
            <Button colorScheme="secondary">Registrate</Button>
          </Link>
        </SwitchAuthNav>
        <div className="w-full max-w-[1120px] md:min-h-[600px] mx-auto p-2 md:mt-10 md:flex items-center justify-center md:gap-10 md:border md:border-gray-200 md:border-none shadow-xl xl:shadow-none">
          <div className="">
            <AuthHero title="Ingresa a tu cuenta" />
            <AuthForm onSubmit={onSubmitHandler}>
              <div className="my-2">
                <label htmlFor="login-email">Email</label>
                <TextField
                  onChange={(e) => onChangeHandler(e)}
                  autoFocus
                  required
                  type="email"
                  id="login-email"
                  name="loginemail"
                />
              </div>
              <div className="my-2">
                <label htmlFor="login-password">Contraseña</label>
                <TextField
                  onChange={(e) => onChangeHandler(e)}
                  required
                  type="password"
                  id="login-password"
                  name="password"
                />
              </div>
              <div className="my-2 flex justify-center">
                <Button colorScheme="primary">Iniciar Sesión</Button>
              </div>
            </AuthForm>
          </div>
          <div className="md:w-3/6">
            <div className="w-5/6 md:w-full mx-auto bg-indigo-500 rounded-3xl">
              <img
                className="object-cover"
                src="https://cdni.iconscout.com/illustration/premium/thumb/web-developer-working-on-website-3839564-3202810.png"
                alt="dashboard"
              />
            </div>
            <div className="text-center my-5">
              <p className="text-gray-800">Todavía no estas registrado?</p>
              <Link className="text-indigo-500 font-semibold" to="/registro">
                Registrate gratis ahora
              </Link>
            </div>
          </div>
        </div>

        <Footer>
          <img
            className="w-[70px]"
            src={require("../img/logo.png")}
            alt="logo"
          />
          <p className="text-indigo-900">by Facundo Acosta :)</p>
        </Footer>
      </div>
    </>
  );
};

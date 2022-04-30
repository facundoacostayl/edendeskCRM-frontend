import { AuthContext } from "./AuthContext";
import { useContext, useEffect } from "react";
import { useState } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  //State for checking if the user is authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:4000/verificar", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsLoggedIn(true) : setIsLoggedIn(false)

      console.log(localStorage.token);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const signUp = async (
    firstname: string,
    loginemail: string,
    password: string
  ) => {
    const body = { firstname, loginemail, password };

    try {
      const response = await fetch("http://localhost:4000/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      console.log(parseRes);

      localStorage.setItem("token", parseRes);

      checkAuth();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const signIn = async (loginemail: string, password: string) => {
    const body = { loginemail, password };

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes);

      checkAuth();

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };


  useEffect(() => {
    checkAuth()
  }, [isLoggedIn])

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    signUp,
    signIn,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

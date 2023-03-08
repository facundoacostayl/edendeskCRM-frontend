import { AuthContext } from "./AuthContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "./types";

//UTILS
import { currentUrl } from "../utils/apiUrl";

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
  const [userData, setUserData] = useState<User>({} as User);

  const getUserData = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(`${currentUrl}/api/2.0/user/${id}`);

      const parseRes: User = await response.json();

      setUserData(parseRes);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(`${currentUrl}/api/2.0/user/verify`, {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsLoggedIn(true) : setIsLoggedIn(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const signUp = async (
    firstName: string,
    loginEmail: string,
    password: string
  ) => {
    const body = { firstName, loginEmail, password };

    try {
      const response = await fetch(`${currentUrl}/api/2.0/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!parseRes.data) {
        throw new Error(parseRes.message);
      }

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("userId", parseRes.data.id);
        checkAuth();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const signIn = async (loginEmail: string, password: string) => {
    const body = { loginEmail, password };

    try {
      const response = await fetch(`${currentUrl}/api/2.0/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!parseRes.data) {
        throw new Error(parseRes.message);
      }

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("userId", parseRes.data.id);
        checkAuth();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    checkAuth();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) checkAuth();
  }, []);

  useEffect(() => {
    isLoggedIn && getUserData();
  }, [isLoggedIn]);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    signUp,
    signIn,
    checkAuth,
    userData,
    setUserData,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

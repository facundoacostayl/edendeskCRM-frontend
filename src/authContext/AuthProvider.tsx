import { AuthContext } from "./AuthContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import { User } from './types';

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

  const navigate = useNavigate();

  const getUserData = async() => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:4000/user/${id}`)
      
      const parseRes: User = await response.json();

      console.log(parseRes)
      setUserData(parseRes);
    }catch(error){
      error instanceof Error && console.error(error.message)
    }
  }

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:4000/verificar", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsLoggedIn(true) : setIsLoggedIn(false);

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

      if(parseRes.token){
      localStorage.setItem("token", parseRes.token);
      localStorage.setItem("userId", parseRes.id)
      checkAuth();
      }else{
        toast.error("Debes llenar todos los campos")
      }
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

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("userId", parseRes.id)
        checkAuth();
      }else {
        toast.error(parseRes)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId")
    navigate(0)
  }

  useEffect(() => {
    checkAuth();
    console.log(isLoggedIn)
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn && getUserData()
  }, [])

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    signUp,
    signIn,
    checkAuth,
    userData,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

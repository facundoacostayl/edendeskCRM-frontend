import React, {createContext} from 'react';
import {ToastContainerProps} from 'react-toastify'

type AuthContextProps = {
    signUp: (name: string, email: string, password: string) => Promise<void>,
    signIn: (email: string, password: string) => Promise<void>,
    checkAuth : () => Promise<void>,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
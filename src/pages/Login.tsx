//Components
import { SwitchAuthNav } from "../ui/navbar"
import {AuthHero} from '../components/AuthHero';
import {AuthForm} from '../ui/form/authForm';
import {TextField} from '../ui/form/textField';
import {Button} from '../ui/controls/button';

//Hooks
import {useAuth} from '../authContext/AuthProvider';
import {useToken} from '../authContext/AuthProvider';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


export const Login = () => {

  const {signIn, isLoggedIn, setIsLoggedIn, checkAuth} = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    loginemail: "",
    password: ""
  })

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({...userData, [e.currentTarget.name]: e.currentTarget.value});
  }

  const onSubmitHandler = (e: React.FormEvent) => {
      e.preventDefault();

      const email = userData.loginemail;
      const password = userData.password;

      signIn(email, password);
  }

  return (
    <>
    <SwitchAuthNav>
      <Button colorScheme="secondary">Registrate</Button>
    </SwitchAuthNav>
    <AuthHero title="Ingresa a tu cuenta"/>
    <AuthForm onSubmit={onSubmitHandler}>
      <div className="my-2">
          <label htmlFor="login-email">Email</label>
          <TextField onChange={e => onChangeHandler(e)} autoFocus required type="email" id="login-email" name="loginemail"/>
      </div>
      <div className="my-2">
          <label htmlFor="login-password">Contraseña</label>
          <TextField onChange={e => onChangeHandler(e)} required type="password" id="login-password" name="password"/>
      </div>
      <div className="my-2">
          <Button colorScheme="primary">Iniciar Sesión</Button>
      </div>
    </AuthForm>
    </>
  )
}

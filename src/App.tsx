//Components
import { Routes, Route } from "react-router-dom";
import { PrivateLoggedRoutes, PrivateNotLoggedRoutes } from "./privateRoutes";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import {NewClient} from './pages/NewClient';
import {ClientBalance} from './pages/ClientBalance';
import {MyClients} from './pages/MyClients';
import {ClientProfile} from './pages/ClientProfile';

//Hooks
import { useAuth } from "./authContext/AuthProvider";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<PrivateNotLoggedRoutes authorize={isLoggedIn} />}>
          <Route path="/registro" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route element={<PrivateLoggedRoutes authorize={isLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/nuevo-cliente" element={<NewClient/>}></Route>
        <Route path="/nuevo-saldo" element={<ClientBalance/>}></Route>
        <Route path="/mis-clientes" element={<MyClients/>}></Route>
        <Route path="/mis-clientes/cliente/:id" element={<ClientProfile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

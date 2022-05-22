//PAGES
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { NewClient } from "./pages/NewClient";
import { ClientBalance } from "./pages/ClientBalance";
import { MyClients } from "./pages/MyClients";
import { ClientProfile } from "./pages/ClientProfile";
import { MyProfile } from "./pages/MyProfile";

//SIDEBAR
import { Sidebar } from "./components";

//ROUTER
import { Routes, Route } from "react-router-dom";
import { PrivateLoggedRoutes, PrivateNotLoggedRoutes } from "./privateRoutes";

//HOOKS
import { useAuth } from "./authContext/AuthProvider";

//TOAST NOTIFICATIONS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <ToastContainer hideProgressBar={true} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<PrivateNotLoggedRoutes authorize={isLoggedIn} />}>
          <Route path="/registro" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
      <Routes>
        <Route element={<PrivateLoggedRoutes authorize={isLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route path="/nuevo-cliente" element={<NewClient />}></Route>
        <Route path="/nuevo-saldo" element={<ClientBalance />}></Route>
        <Route path="/mis-clientes" element={<MyClients />}></Route>
        <Route
          path="/mis-clientes/cliente/:id"
          element={<ClientProfile />}
        ></Route>
        <Route path="/mi-perfil" element={<MyProfile />}></Route>
        <Route path="*" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

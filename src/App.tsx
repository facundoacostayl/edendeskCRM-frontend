//HOOKS
import { useAuth } from "./authContext/AuthProvider";

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

//ROUTER
import { Routes, Route } from "react-router-dom";
import { PrivateLoggedRoutes, PrivateNotLoggedRoutes } from "./privateRoutes";

//TOAST NOTIFICATIONS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <ToastContainer hideProgressBar={true} />
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/registro" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </>
        )}

        {isLoggedIn && (
          <>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/nuevo-cliente" element={<NewClient />}></Route>
            <Route path="/nuevo-saldo" element={<ClientBalance />}></Route>
            <Route path="/mis-clientes" element={<MyClients />}></Route>
            <Route
              path="/mis-clientes/cliente/:id"
              element={<ClientProfile />}
            ></Route>
            <Route path="/mi-perfil" element={<MyProfile />}></Route>
          </>
        )}

        <Route path="*" element={isLoggedIn ? <Dashboard /> : <Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

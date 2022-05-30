import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./authContext/AuthProvider";
import { ClientProvider } from "./clientsContext/ClientProvider";
import { ChartProvider } from "./chartContext/ChartProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ClientProvider>
          <ChartProvider>
            <App />
          </ChartProvider>
        </ClientProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

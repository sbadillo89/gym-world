import { App } from "./app";
import { AuthProvider } from "@context/auth-context";
import React from "react";
import ReactDOM from "react-dom";
// eslint-disable-next-line import/no-namespace
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorkerRegistration.register();

//template

//https://reactjsexample.com/a-free-admin-dashboard-template-built-with-tailwind-css-and-react/

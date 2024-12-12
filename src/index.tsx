import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
      <ToastContainer
        autoClose={4000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </NextUIProvider>
  </React.StrictMode>,
);

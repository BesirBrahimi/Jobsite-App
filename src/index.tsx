import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MyContextProvider } from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MyContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyContextProvider>
  </React.StrictMode>
);

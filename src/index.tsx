import React from "react";
import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import StoreIndex from "./data/StoreIndex";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={StoreIndex}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

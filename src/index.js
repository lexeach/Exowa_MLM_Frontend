import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store, persistor } from './Redux/Store';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null}  persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <Toaster position="top-center" reverseOrder={false}   autoClose={1000} />
  </React.StrictMode>
);

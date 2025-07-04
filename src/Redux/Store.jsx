import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import DoWin from "./DoWinSlice";

// const pro = process.env.REACT_APP_MODE==="production";
const isLocal = window.location.hostname === "localhost";
const isProduction = process.env.REACT_APP_MODE === "production";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, DoWin);

const store = configureStore({
  reducer: {
    doWin: persistedReducer,
  },
  devTools: isLocal || !isProduction,
});

const persistor = persistStore(store);

export { store, persistor };

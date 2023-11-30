import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistStore from "redux-persist/es/persistStore";
import mainReducer from "../reducer/MainReducer";
import userReducer from "../reducer/UserReducer";
import indirizzoReducer from "../reducer/IndirizzoReducer";
import cartaReducer from "../reducer/CartaReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_LOCALSTORAGEKEY,
    }),
  ],
  whitelist: ["userReducer"],
};

const rootReducer = combineReducers({
  mainReducer: mainReducer,
  userReducer: userReducer,
  indirizzoReducer: indirizzoReducer,
  cartaReducer: cartaReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persiStore = persistStore(store);

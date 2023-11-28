import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import MainReducer from "../reducer/MainReducer";
import persistStore from "redux-persist/es/persistStore";
import UserReducer from "../reducer/UserReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_LOCALSTORAGEKEY,
    }),
  ],
  // whitelist:[];
};

const rootReducer = combineReducers({
  mainReducer: MainReducer,
  userReducer: UserReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persiStore = persistStore(store);

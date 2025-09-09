// src/store/persist.ts
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  // aur reducers add karna ho toh yahan
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [""],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootReducer = ReturnType<typeof rootReducer>;
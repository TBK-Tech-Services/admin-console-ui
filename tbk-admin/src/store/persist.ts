import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '../store/slices/authSlice.ts';

const rootReducer = combineReducers({
  auth : authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootReducer = ReturnType<typeof rootReducer>;
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '../store/slices/authSlice.ts';
import villasReducer from '../store/slices/villasSlice.ts';
import bookingsReducer from '../store/slices/bookingsSlice.ts';

const rootReducer = combineReducers({
  auth : authReducer,
  villas : villasReducer,
  bookings : bookingsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth" , "villas" , "bookings"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootReducer = ReturnType<typeof rootReducer>;
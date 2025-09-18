import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '../store/slices/authSlice.ts';
import villasReducer from '../store/slices/villasSlice.ts';
import bookingsReducer from '../store/slices/bookingsSlice.ts';
import amenitiesReducer from '../store/slices/amenitiesSlice.ts';

const rootReducer = combineReducers({
  auth : authReducer,
  villas : villasReducer,
  bookings : bookingsReducer,
  amenities : amenitiesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth" , "villas" , "bookings" , "amenities"],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootReducer = ReturnType<typeof rootReducer>;
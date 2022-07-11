import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import contactsReducer from "../redux/contactsSlice.jsx";
import authReducer from "../redux/authSlice.jsx";
import { serviceAPI } from "services";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  serviceAPI.middleware,
];

export const store = configureStore({
  reducer: {
    users: persistReducer(authPersistConfig, authReducer),
    contacts: contactsReducer,
    [serviceAPI.reducerPath]: serviceAPI.reducer,
  },
  middleware,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

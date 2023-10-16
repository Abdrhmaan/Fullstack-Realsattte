
import { configureStore, getDefaultMiddleware ,combineReducers,} from "@reduxjs/toolkit";
import userslice from "./user/userslice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({ user: userslice });



const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export  const store = configureStore({

   reducer: persistedReducer,
    middleware : (getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
    })

})


export const persistor = persistStore(store);
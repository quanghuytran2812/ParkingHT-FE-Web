import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const commonConfig = {
  key: 'root/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isAuthenticated', 'token', 'user']
}

export const redux = configureStore({
  reducer: {
    auth: persistReducer(userConfig, authSlice),
  },
})


export const persistor =  persistStore(redux)

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/authSlice';
import categorySlice from './category/categorySlice';
import storage from 'redux-persist/lib/storage';
import { 
  persistReducer, 
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import reportSlice from './report/reportSlice';


const commonConfig = {
  key: 'root/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isAuthenticated', 'token']
}

export const redux = configureStore({
  reducer: {
    auth: persistReducer(userConfig, authSlice),
    category: categorySlice,
    report: reportSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})


export const persistor =  persistStore(redux)

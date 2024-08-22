import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import preferencesReducer from './preferencesSlice';
import persistConfig from '../utils/persist.config';

const persistedReducer = persistReducer(persistConfig, preferencesReducer);

export const store = configureStore({
  reducer: {
    preferences: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

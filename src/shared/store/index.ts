import { configureStore } from '@reduxjs/toolkit';

import { managerAPI } from 'shared/api';
import authSlice from './model/authSlice';
import langSlice from './model/langSlice';

export const store = configureStore({
  reducer: {
    [managerAPI.reducerPath]: managerAPI.reducer,
    authSlice: authSlice.reducer,
    langSlice: langSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(managerAPI.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

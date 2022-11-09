import { configureStore } from '@reduxjs/toolkit';

import { managerAPI } from 'shared/api';

export const store = configureStore({
  reducer: { [managerAPI.reducerPath]: managerAPI.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(managerAPI.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

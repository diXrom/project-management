import { configureStore } from '@reduxjs/toolkit';

import { postAPI } from 'shared/api';

export const store = configureStore({
  reducer: { [postAPI.reducerPath]: postAPI.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

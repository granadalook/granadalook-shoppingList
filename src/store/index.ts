import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import listsReducer from './listsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lists: listsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

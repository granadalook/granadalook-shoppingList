// src/test/testStore.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import listsReducer from '../store/listsSlice';

export const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      lists: listsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });

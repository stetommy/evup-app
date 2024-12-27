import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'features/api/apiSlice';
import authReducer from 'features/auth/authSlice';
import courseReducer from 'features/course/courseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default store;

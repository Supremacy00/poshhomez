import { configureStore } from '@reduxjs/toolkit';
import apartmentReducer from './slices/apartmentSlice';

const store = configureStore({
  reducer: {
    apartment: apartmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

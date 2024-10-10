import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from '../reducer/spinnerSlice';

const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

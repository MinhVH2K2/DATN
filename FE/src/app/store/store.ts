import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from '../reducer/spinnerSlice';
import orderReducer from '../reducer/orderSlice';

const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

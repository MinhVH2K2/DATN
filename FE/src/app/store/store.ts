import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from '../reducer/spinnerSlice';
import producrReducer from '../reducer/productSlice';
import cartReducer from '../reducer/cartSlice';
const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    products: producrReducer,
    carts :cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

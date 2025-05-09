import { configureStore } from '@reduxjs/toolkit';
import spinnerReducer from '../reducer/spinnerSlice';
import productReducer from '../reducer/productSlice'; // Sửa lỗi chính tả: "producrReducer" thành "productReducer"
import cartReducer from '../reducer/cartSlice';
import orderReducer from '../reducer/orderSlice'; // Import orderSlice reducer

const store = configureStore({
  reducer: {
    spinner: spinnerReducer,
    products: productReducer,
    carts: cartReducer,
    order: orderReducer, // Thêm orderSlice reducer vào đây
    
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

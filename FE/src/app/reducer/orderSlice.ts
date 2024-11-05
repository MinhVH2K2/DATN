import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderItemModel, OrderModel } from '../model/OrderMoldel';


interface OrderState {
    orders: OrderModel[];
}

const initialState: OrderState = {
    orders: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<OrderModel>) {
            state.orders.push(action.payload);
        },
        updateOrder(state, action: PayloadAction<OrderModel>) {
            const index = state.orders.findIndex(order => order.orderId === action.payload.orderId);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        removeOrder(state, action: PayloadAction<number>) {
            state.orders = state.orders.filter(order => order.orderId !== action.payload);
        },
        addOrderItem(state, action: PayloadAction<{ orderId: number; item: OrderItemModel }>) {
            const order = state.orders.find(order => order.orderId === action.payload.orderId);
            if (order) {
                order.orderItems = order.orderItems || []; // Khởi tạo mảng nếu chưa có
                order.orderItems.push(action.payload.item);
            }          
        },
        removeOrderItem: (state, action: PayloadAction<{ orderId: number; orderItemId: number }>) => {
            const { orderId, orderItemId } = action.payload;
            const order = state.orders.find(order => order.orderId === orderId); 
        
            if (order && order.orderItems) {
                order.orderItems = order.orderItems.filter(item => item.orderItemId !== orderItemId);
            }         
        },
        // updateOrderItem(state, action: PayloadAction<{ orderId: number; orderItemId: number; quantity: number }>) {
        //     const { orderId, orderItemId, quantity } = action.payload;
        //     const orderIndex = state.orders.findIndex(order => order.orderId === orderId);           
        //     if (orderIndex !== -1) {
        //         const order = state.orders[orderIndex];
        //         const itemIndex = order.orderItems?.findIndex(item => item.orderItemId === orderItemId);
        //         if (itemIndex !== -1) {
        //             order.orderItems?[itemIndex] = {
        //                 ...order.orderItems[itemIndex],
        //                 quantity: quantity 
        //             };
        //         }
        //     }
        // },       
    },
});

export const { addOrder, updateOrder, removeOrder, addOrderItem, removeOrderItem } = orderSlice.actions;

export default orderSlice.reducer;

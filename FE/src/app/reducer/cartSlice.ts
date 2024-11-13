// src/reducers/cartReducer.ts
import { CartState, CartItem } from '../model/CartModel';
import { AnyAction } from 'redux';

const initialState: CartState = {
    cart: [],
};

const cartReducer = (state: CartState = initialState, action: AnyAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingProductIndex = state.cart.findIndex(
                (item) => item.productId === action.payload.productId && item.size === action.payload.size
            );

            if (existingProductIndex >= 0) {
                // Create a new array and update the quantity of the existing item
                const updatedCart = state.cart.map((item, index) => {
                    if (index === existingProductIndex) {
                        // Return a new object for the product with updated quantity
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item; // Return other items unchanged
                });

                return {
                    ...state,
                    cart: updatedCart, // Return the new cart array
                };
            } else {
                // Product is not in the cart, so add it
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        { ...action.payload, quantity: 1 }, // Add the new product with quantity 1
                    ],
                };
            }

        default:
            return state;
    }
};

export default cartReducer;

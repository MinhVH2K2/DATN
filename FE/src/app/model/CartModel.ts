// src/types/cartTypes.ts

export interface CartItem {
    productId: string;
    productName: string;
    size: string;
    price: number;
    image: string;
    quantity: number;
}

export interface CartState {
    cart: CartItem[];
}

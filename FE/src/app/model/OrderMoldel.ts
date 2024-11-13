import { ProductDetailModel } from "./ProductModel";

export class OrderModel {
    orderId?: number;
    userId?: string;
    discountId?: string;
    totalPrice?: number;
    status?: number;
    createdBy?: string;
    orderItems?: OrderItemModel[];
    constructor(orderId?: number, userId?: string, discountId?: string,
         totalPrice?: number, status?: number, createdBy?: string, orderItems?: OrderItemModel[]){
        this.orderId = orderId;
        this.userId = userId;
        this.discountId = discountId;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdBy = createdBy;
        this.orderItems = orderItems;
    };
} 
export class OrderItemModel {
    orderItemId?: number;
    orderId?: number;
    productDetailId?: ProductDetailModel;
    productName?: string;
    quantity?: number;
    unitPrice?: number;
    discountPrice?: number;
    totalPrice?: number;
    constructor(orderItemId?: number,orderId?: number,productDetailId?: ProductDetailModel,quantity?: number,
         unitPrice?: number, discountPrice?: number, totalPrice?: number, productName?: string,){
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.productDetailId = productDetailId;
        this.productName = productName;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.discountPrice = discountPrice;
        this.totalPrice = totalPrice;
    }; 
}

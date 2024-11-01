export class OrderModel {
    orderId?: string;
    userId?: string;
    discountId?: string;
    totalPrice?: number;
    status?: string;
    createdBy?: string;
    orderItems?: OrderItemModel;
    constructor(orderId?: string, userId?: string, discountId?:  string,
         totalPrice?: number, status?: string,createdBy?: string,  orderItems?: OrderItemModel){
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
    orderId?: string;
    productDetailId?: string;
    quantity?: number;
    unitPrice?: number;
    discountPrice?: number;
    totalPrice?: number;
}

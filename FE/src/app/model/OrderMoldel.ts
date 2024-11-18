import { ProductDetailModel } from "./ProductModel";

export class OrderModel {
    orderId?: number;
    userId?: string;
    discountId?: string;
    totalPrice?: number;
    status?: number;
    createdDate?: string;
    createdBy?: string;
    orderItems?: OrderItemModel[];
    constructor(orderId?: number, userId?: string, discountId?: string, createdDate?: string,
         totalPrice?: number, status?: number, createdBy?: string, orderItems?: OrderItemModel[]){
        this.orderId = orderId;
        this.userId = userId;
        this.discountId = discountId;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdDate = createdDate;
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
export class DiscountModel {
    discountId: string;
    discountValue: number;
    discountType: 'percentage' | 'fixed'; // Sử dụng union type để giới hạn các giá trị có thể có
    startDate: Date;
    endDate: Date;
    status: 'active' | 'expired' | 'upcoming'; // Giới hạn giá trị trạng thái
    description: string;
    condition: number;
  
    constructor(
      discountId: string,
      discountValue: number,
      discountType: 'percentage' | 'fixed',
      startDate: Date,
      endDate: Date,
      status: 'active' | 'expired' | 'upcoming',
      description: string,
      condition: number
    ) {
      this.discountId = discountId;
      this.discountValue = discountValue;
      this.discountType = discountType;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
      this.description = description;
      this.condition = condition;
    }
  }
  
import { UserModel } from "./LoginModel";
import { ProductDetailModel } from "./ProductModel";

export class OrderModel {
    orderId?: number;
    customer?: UserModel;
    discounts?: DiscountModel;
    totalPrice?: number;
    status?: string;
    createdDate?: Date;
    createdBy?: string;
    orderItems?: OrderItemModel[];
    constructor(orderId?: number, customer?: UserModel, discounts?: DiscountModel, createdDate?: Date,
         totalPrice?: number, status?: string, createdBy?: string, orderItems?: OrderItemModel[]){
        this.orderId = orderId;
        this.customer = customer;
        this.discounts = discounts;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.orderItems = orderItems;
    };
} 
export class OrderItemModel {
    orderItemId?: number;
    orders?: OrderModel;
    productDetail?: ProductDetailModel;
    productName?: string;
    quantity?: number;
    unitPrice?: number;
    discountPrice?: number;
    totalPrice?: number;
    constructor(orderItemId?: number,orders?: OrderModel,productDetail?: ProductDetailModel,quantity?: number,
         unitPrice?: number, discountPrice?: number, totalPrice?: number, productName?: string,){
        this.orderItemId = orderItemId;
        this.orders = orders;
        this.productDetail = productDetail;
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
  
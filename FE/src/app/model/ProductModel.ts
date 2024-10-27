export class ProductRequest{
    productId?: string;
    productName?: string;
    description?: string;
    weight?: number;
    constructor(productId?: string, productName?: string, description?: string, weight?: number){
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.weight = weight;
    };
}
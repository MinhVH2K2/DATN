export class ProductModel {
    productId?: string;
    productName?: string;
    description?: string;
    weight?: number;
    brands?: BrandModel;
    material?: MarterialModel;
    categories?: CategoriModel;

    constructor(
        productId?: string,
        productName?: string,
        description?: string,
        weight?: number,
        brands?: BrandModel,
        material?: MarterialModel,
        categories?: CategoriModel
    ) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.weight = weight;
        this.brands = brands;
        this.material = material;
        this.categories = categories;
    }
}

export class MarterialModel {
    materialId?: string;
    materialName?: string;
    constructor(materialId?: string, materialName?: string ){
        this.materialId = materialId;
        this.materialName = materialName;
        
    };
}
export class ColorModel{
    colerId?: string;
    colorName?: string;
    colorCode?: string;
    constructor(colerId?: string, corlorName?: string, colorCode?: string){
        this.colerId = colerId;
        this.colorCode = colorCode;
        this.colorName = corlorName;
    };
}
export class SizeModel{
    sizesId?: string;
    sizesName?: string;
    constructor(sizesId?: string, sizesName?: string){
        this.sizesId = sizesId;
        this.sizesName = sizesName;
    };
}
export class BrandModel {
    brandId?: string;
    brandName?: string;
    brandLogo?: string;
    constructor(brandId?: string, brandName?: string, brandLogo?: string){
        this.brandId = brandId;
        this.brandName = brandName;
        this.brandLogo = brandLogo;
    };
}

export class ProductImageModel {
    imageId?: string;
    imageUrl?: string;
    isThumbnail?: number;
    constructor(imageId?: string, imageUrl?: string, isThumbnail?: number){
        this.imageId = imageId;
        this.imageUrl = imageUrl;
        this.isThumbnail = isThumbnail;
    };
}
export class ProductDetailModel {
    productDetailId?: string;
    productId?: ProductModel;
    colorModel?: ColorModel;
    sizeModel?: SizeModel;
    productImages?: ProductImageModel;

    constructor(productDetailId?: string, productId?: ProductModel, colorModel?: ColorModel, sizeModel?: SizeModel, productImages?: ProductImageModel) {
        this.productDetailId = productDetailId;
        this.productId = productId;
        this.colorModel = colorModel;
        this.sizeModel = sizeModel;
        this.productImages = productImages;
    }
}
export class CategoriModel {
    categoriesId?: string;
    categoriesName?: string;
    constructor(categoriesId?: string, categoriesName?: string){
        this.categoriesId = categoriesId;
        this.categoriesName = categoriesName;
    }
}
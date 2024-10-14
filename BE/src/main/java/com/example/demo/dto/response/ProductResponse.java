package com.example.demo.dto.response;

import java.util.Date;

public interface ProductResponse {
    // product
    String getProductId();

    String getProductName();

    String getDescription();

    Double getDiscountPrice();

    Double getUnitPrice();

    Double getIsDiscount();

    Double getIsSpecial();

    Double getWeight();

    Date getCreateDate();

    Date getUpdateDate();

    // brand
    Long getBrandId();

    String getBrandName();

    String getBrandLogo();

    // materrial
    Long getMaterialId();

    String getMaterialName();

    // category
    String getCategoriesId();

    String getCategoriesName();

    // priductImages
    String getImageId();

    String getImageUrl();

    Long getIsThumbnail();

    // productDetail
    Long getProductDetailId();

    Integer getPuantity();

    String getDescriptionProductDetal();

    // size
    Long getSizesId();

    String getSizesName();

    // coler
    Long getColerId();

    String getCorlorName();

    String getColorCode();
}

package com.example.demo.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface Order2Response {
    // orders
    String getOrderId();
    String getUserId();
    String getDiscountId();
    BigDecimal getTotalPrice();
    String getStatus();
    LocalDateTime getCreatedDate();
    String getCreatedBy();
    LocalDateTime getUpdatedDate();
    String getUpdatedBy();
    // orders item
    Long getOrderItemId();
    String getProductDetailId();
    Integer getQuantity();
    BigDecimal getUnitPrice();
    BigDecimal getDiscountPrice();
    // discount
    Integer getDiscountValue();
    String getDiscountType();
    LocalDateTime getStartDate();
    LocalDateTime getEndDate();
    String getDiscountStatus();
    String getDescription();
    Integer getCondition();
}

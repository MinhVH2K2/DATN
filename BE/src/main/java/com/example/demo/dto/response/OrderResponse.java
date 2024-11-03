package com.example.demo.dto.response;

import com.example.demo.model.Discounts;
import com.example.demo.model.OrderItems;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private String orderId;
    private String userId;
    private String discountId;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdDate;
    private String createdBy;
    private LocalDateTime updatedDate;
    private String updatedBy;
    private List<OrderItems> orderItems;
    private Discounts discounts;
}

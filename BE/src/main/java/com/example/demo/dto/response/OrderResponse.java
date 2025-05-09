package com.example.demo.dto.response;

import com.example.demo.model.Discounts;
import com.example.demo.model.OrderItems;
import com.example.demo.model.User;
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
    private User customer;
    private Discounts discounts;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdDate;
    private String createdBy;
    private List<OrderItems> orderItems;
}

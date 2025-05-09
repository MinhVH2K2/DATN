package com.example.demo.dto.request;

import com.example.demo.model.Discounts;
import com.example.demo.model.OrderItems;
import com.example.demo.model.Orders;
import com.example.demo.model.User;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data

public class OrderRequest {
    private User customer;
    private Discounts discounts;
    private BigDecimal totalPrice;
    private String status;
    private LocalDateTime createdDate;
    private String createdBy;
    private List<OrderItems> orderItems;
}

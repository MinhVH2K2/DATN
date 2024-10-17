package com.example.demo.dto.request;

import com.example.demo.model.OrderItems;
import com.example.demo.model.Orders;
import lombok.Data;

import java.util.List;

@Data

public class OrderRequest {
    private Orders order;
    private List<OrderItems> orderItemsData;
}

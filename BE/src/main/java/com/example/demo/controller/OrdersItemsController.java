package com.example.demo.controller;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.dto.response.OrdersResponse;
import com.example.demo.model.OrderItems;
import com.example.demo.model.Orders;
import com.example.demo.service.OrdersItemsService;
import com.example.demo.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("order-items")
public class OrdersItemsController {

    @Autowired
    private OrdersItemsService orderItemsService;

//    @GetMapping("/by-order/{orderId}")
//    public ResponseEntity<List<OrderItems>> getOrderItemsByOrderId(@PathVariable String orderId) {
//        List<OrderItems> orderItems = orderItemsService.findOrderItemsByOrderId(orderId);
//        return ResponseEntity.ok(orderItems);
//    }

}

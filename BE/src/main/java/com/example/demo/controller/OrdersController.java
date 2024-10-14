package com.example.demo.controller;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.model.Discounts;
import com.example.demo.model.OrderItems;
import com.example.demo.model.Orders;
import com.example.demo.service.DiscountsService;
import com.example.demo.service.OrdersService;
import org.slf4j.ILoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("orders")
public class OrdersController {

    @Autowired
    private OrdersService orderService;

    @GetMapping("all-orders")
    public ResponseEntity<Page<Orders>> getAllOrders(Pageable pageable) {
        Page<Orders> orders = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(orders);
    }

    // @PostMapping("/add-orders2")
    // public Orders createOrder(@RequestBody Orders orders, @RequestBody List<OrderItems> orderItemsData) {
    //     System.out.println(orders.toString());
    //     return orderService.createOrder(orders, orderItemsData);
    // }

    @PostMapping("/add-orders")
    public Orders createOrder(@RequestBody OrderRequest orderRequest) {
        System.out.println(orderRequest.toString());
        return orderService.createOrder(orderRequest.getOrder(), orderRequest.getOrderItemsData());
    }
}

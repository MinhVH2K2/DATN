package com.example.demo.controller;

import com.example.demo.dto.request.OrderRequest;
import com.example.demo.dto.response.OrderResponse;
import com.example.demo.dto.response.OrdersResponse;
import com.example.demo.model.Orders;
import com.example.demo.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("orders")
public class OrdersController {

    @Autowired
    private OrdersService orderService;

//    @Autowired
//    private OrderService order2Service;

    @GetMapping("/all-orders")
    public ResponseEntity<OrdersResponse<OrderResponse>> getAllOrders(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        OrdersResponse<OrderResponse> ordersResponse = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(ordersResponse);
    }
//    @GetMapping("/all-orders")
//    public ResponseEntity<OrdersResponse<OrderResponse>> getAllOrders(@RequestParam(defaultValue = "0") int page,
//                                                                      @RequestParam(defaultValue = "10") int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        OrdersResponse<OrderResponse> ordersResponse = orderService.getAllOrders(pageable);
//        return ResponseEntity.ok(ordersResponse);
//    }
    @PostMapping("/add-orders")
    public Orders createOrder(@RequestBody OrderRequest orderRequest) {
        System.out.println(orderRequest.toString());
        return orderService.createOrder(orderRequest, orderRequest.getOrderItems());
    }

}

package com.example.demo.service;

import com.example.demo.model.OrderItems;
import com.example.demo.repository.DiscountsRepository;
import com.example.demo.repository.OrderItemsRepository;
import com.example.demo.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersItemsService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private DiscountsRepository discountsRepository;

    public List<OrderItems> findOrderItemsByOrderId(String orderId) {
        return orderItemsRepository.findByOrderId(orderId);
    }

}

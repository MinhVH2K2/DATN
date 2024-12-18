package com.example.demo.service;

import com.example.demo.dto.response.OrderResponse;
import com.example.demo.dto.response.OrdersResponse;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.model.Discounts;
import com.example.demo.model.OrderItems;
import com.example.demo.model.Orders;
import com.example.demo.repository.DiscountsRepository;
import com.example.demo.repository.OrderItemsRepository;
import com.example.demo.repository.OrdersRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private DiscountsRepository discountsRepository;

    public OrdersResponse<OrderResponse> getAllOrders(Pageable pageable) {
        Page<Orders> pageOrders = ordersRepository.findAllWithOrderItemsAndDiscounts(pageable);

        List<OrderResponse> orderResponseList = pageOrders.getContent().stream()
                .map(order -> OrderResponse.builder()
                        .orderId(order.getOrderId())
                        .userId(order.getUserId())
                        .discountId(order.getDiscountId())
                        .totalPrice(order.getTotalPrice())
                        .status(order.getStatus())
                        .createdDate(order.getCreatedDate())
                        .createdBy(order.getCreatedBy())
                        .updatedDate(order.getUpdatedDate())
                        .updatedBy(order.getUpdatedBy())
                        .orderItems(order.getOrderItems())
                        .discounts(order.getDiscounts())
                        .build())
                .collect(Collectors.toList());

        OrdersResponse<OrderResponse> response = OrdersResponse.<OrderResponse>builder()
                .pageNo(pageOrders.getNumber())
                .pageSize(pageOrders.getSize())
                .totalElements(pageOrders.getTotalElements())
                .totalPages(pageOrders.getTotalPages())
                .data(orderResponseList)
                .build();

        return response;
    }


    @Transactional
    public Orders createOrder(Orders order, List<OrderItems> orderItemsData) {
        if (orderItemsData == null || orderItemsData.isEmpty()) {
            throw new IllegalArgumentException("Order items data cannot be null or empty");
        }

        Orders savedOrder = ordersRepository.save(order);
        List<OrderItems> orderItems = new ArrayList<>();
        order.setOrderItems(orderItems);

        BigDecimal totalPrice = BigDecimal.ZERO;
        for (OrderItems itemData : orderItemsData) {
            OrderItems orderItem = new OrderItems();
            orderItem.setOrders(savedOrder);
            orderItem.setOrderId(savedOrder.getOrderId());
            orderItem.setProductDetailId(itemData.getProductDetailId());
            orderItem.setQuantity(itemData.getQuantity());
            orderItem.setUnitPrice(itemData.getUnitPrice());
            orderItem.setDiscountPrice(itemData.getDiscountPrice());

            BigDecimal totalItemPrice = itemData.getUnitPrice()
                    .multiply(BigDecimal.valueOf(itemData.getQuantity()))
                    .subtract(itemData.getDiscountPrice() != null ? itemData.getDiscountPrice() : BigDecimal.ZERO);
            orderItem.setTotalPrice(totalItemPrice);

            orderItems.add(orderItem);
            totalPrice = totalPrice.add(totalItemPrice);
            orderItemsRepository.save(orderItem); // Ensure each orderItem is saved
        }
        savedOrder.setTotalPrice(totalPrice);
        ordersRepository.save(savedOrder);
        return savedOrder;
    }

}

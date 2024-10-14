package com.example.demo.service;

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

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Autowired
    private DiscountsRepository discountsRepository;

    public Page<Orders> getAllOrders(Pageable pageable) {
        return ordersRepository.findAll(pageable);
    }

    private static final Logger logger = LoggerFactory.getLogger(OrdersService.class);

    /*
        @Transactional
        public Orders createOrder(Orders order) {
            logger.info("Starting to create order: {}", order);

            // Kiểm tra đầu vào
            if (order == null) {
                throw new IllegalArgumentException("Order cannot be null");
            }

            // Lưu đơn hàng trước để có orderId
            Orders savedOrder = ordersRepository.save(order);
            logger.info("Order saved with ID: {}", savedOrder.getOrderId());

            // Gán giá trị vào orderItems
            for (OrderItems item : order.getOrderItems()) {
                logger.info("Processing order item: {}", item);
                if (item.getProductDetailId() == null || item.getQuantity() == null || item.getUnitPrice() == null) {
                    throw new IllegalArgumentException("Order item details cannot be null");
                }

                OrderItems orderItem = new OrderItems();
                orderItem.setOrderId(savedOrder.getOrderId());
                orderItem.setProductDetailId(item.getProductDetailId());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setUnitPrice(item.getUnitPrice());
                orderItem.setDiscountPrice(item.getDiscountPrice() != null ? item.getDiscountPrice() : BigDecimal.ZERO);

                // Tính tổng giá trị cho mục đơn hàng
                BigDecimal itemTotal = orderItem.getUnitPrice()
                        .multiply(BigDecimal.valueOf(orderItem.getQuantity()))
                        .subtract(orderItem.getDiscountPrice());
                orderItem.setTotalPrice(itemTotal);

                // Gán đơn hàng cho mục
                orderItem.setOrders(savedOrder);

                // Lưu orderItem vào cơ sở dữ liệu
                orderItemsRepository.save(orderItem); // Ensure each orderItem is saved
                logger.info("Order Item Saved: {}", orderItem);
            }

            // Cập nhật tổng giá trị cho đơn hàng
            BigDecimal totalPrice = savedOrder.getOrderItems().stream()
                    .map(OrderItems::getTotalPrice)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            savedOrder.setTotalPrice(totalPrice);

            // Lưu lại đơn hàng với tổng giá trị mới
            ordersRepository.save(savedOrder);
            logger.info("Order updated with total price: {}", totalPrice);

            return savedOrder; // Trả về đơn hàng đã lưu
        }
     */
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

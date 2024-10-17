package com.example.demo.repository;

import com.example.demo.model.OrderItems;
import com.example.demo.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, String> {

    @Query(value = "SELECT DISTINCT o FROM Orders o " +
            "LEFT JOIN FETCH o.orderItems " +
            "LEFT JOIN FETCH o.discounts",
            countQuery = "SELECT count(o) FROM Orders o")
    Page<Orders> findAllWithOrderItemsAndDiscounts(Pageable pageable);

    @Query(value = "SELECT \n" +
            "     oi.order_id,\n" +
            "    oi.order_item_id,\n" +
            "    oi.product_detail_id,\n" +
            "    oi.quantity,\n" +
            "    oi.unit_price,\n" +
            "    oi.discount_price,\n" +
            "    oi.total_price AS item_total_price,\n" +
            "    o.user_id,\n" +
            "    o.status AS order_status,\n" +
            "    o.total_price AS order_total_price,\n" +
            "    d.discount_value,\n" +
            "    d.discount_type,\n" +
            "    d.description\n" +
            "FROM \n" +
            "    order_items oi\n" +
            "JOIN \n" +
            "    orders o ON oi.order_id = o.order_id\n" +
            "JOIN \n" +
            "    discounts d ON o.discount_id = d.discount_id;\n"
            , nativeQuery = true)
    Page<Orders> findAll(Pageable pageable);
}

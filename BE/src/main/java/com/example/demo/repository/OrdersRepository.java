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

}

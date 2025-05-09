package com.example.demo.repository;

import com.example.demo.model.OrderItems;
import com.example.demo.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {

    @Override
    List<OrderItems> findAllById(Iterable<Long> longs);

//    List<OrderItems> findByOrderId(String orderId);

}

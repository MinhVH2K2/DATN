package com.example.demo.service;

import com.example.demo.dto.response.Order2Response;
import com.example.demo.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

public interface OrderService {
    Page<Orders> getAll(Pageable pageable);
}

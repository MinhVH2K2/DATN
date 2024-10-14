package com.example.demo.service;

import com.example.demo.dto.response.ProductResponse;
import com.example.demo.model.Marterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    Page<ProductResponse> getAll(Pageable pageable);
}

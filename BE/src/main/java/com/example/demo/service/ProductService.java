package com.example.demo.service;

import com.example.demo.dto.response.ProductResponse;
import com.example.demo.model.Marterial;
import com.example.demo.model.ProductDetail;
import com.example.demo.model.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {

    Page<ProductResponse> getAll(Pageable pageable);
    Page<Products> getAllProduct(Pageable pageable);
    Boolean createProduct(Products products);

    Boolean updateProduct(Products products);

    Boolean deleteProduct(String id);
    List<Products> findProductByProductName(String name);
}

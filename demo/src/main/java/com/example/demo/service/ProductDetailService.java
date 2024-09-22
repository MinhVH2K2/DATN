package com.example.demo.service;

import com.example.demo.model.ProductDetail;
import com.example.demo.repository.ProductDetailRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailService {
    @Autowired
    ProductDetailRepo productDetailRepo;

    public List<ProductDetail> getAllProductDetail() {
        return productDetailRepo.findAll();
    }
}

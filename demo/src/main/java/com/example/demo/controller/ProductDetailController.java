package com.example.demo.controller;

import com.example.demo.model.ProductDetail;
import com.example.demo.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class ProductDetailController {
    @Autowired
    ProductDetailService productDetailService;

    @GetMapping("productdetail")
    List<ProductDetail> getAllProductDetail() {
        return productDetailService.getAllProductDetail();

    }
}

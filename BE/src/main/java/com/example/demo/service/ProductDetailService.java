package com.example.demo.service;

import com.example.demo.model.Brands;
import com.example.demo.model.ProductDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProductDetailService {
    Page<ProductDetail> getAll(Pageable pageable);

    Boolean createProductDetail(ProductDetail productDetail);

    Boolean updateProductDetail(ProductDetail productDetail);

    Boolean deleteProductDetail(Long id);

    Optional<ProductDetail> finbyId(Long id);
}

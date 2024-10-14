package com.example.demo.service.impl;

import com.example.demo.model.ProductDetail;
import com.example.demo.repository.ProductDetailRepository;
import com.example.demo.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductDetailServiceImpl implements ProductDetailService {

    @Autowired
    private ProductDetailRepository productDetailRepository ;

    @Override
    public Page<ProductDetail> getAll(Pageable pageable) {
        return productDetailRepository.findAll(pageable);
    }

    @Override
    public Boolean createProductDetail(ProductDetail productDetail) {
        return null;
    }

    @Override
    public Boolean updateProductDetail(ProductDetail productDetail) {
        return null;
    }

    @Override
    public Boolean deleteProductDetail(Long id) {
        return null;
    }

    @Override
    public Optional<ProductDetail> finbyId(Long id) {
        return Optional.empty();
    }
}

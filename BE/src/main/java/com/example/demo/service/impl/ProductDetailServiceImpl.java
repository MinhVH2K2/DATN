package com.example.demo.service.impl;

import com.example.demo.model.Colors;
import com.example.demo.model.ProductDetail;
import com.example.demo.model.Products;
import com.example.demo.model.Sizes;
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
    private ProductDetailRepository productDetailRepository;

    @Override
    public Page<ProductDetail> getAll(Pageable pageable) {
        return productDetailRepository.findAll(pageable);
    }

    @Override
    public Boolean createProductDetail(ProductDetail productDetail) {
        try {
            ProductDetail productDetail1 = ProductDetail.builder()
                    .products(Products.builder()
                            .productId(productDetail.getProducts().getProductId())
                            .build())
                    .colors(Colors.builder()
                            .colerId(productDetail.getColors().getColerId())
                            .build())
                    .sizes(Sizes.builder()
                            .sizesId(productDetail.getSizes().getSizesId())
                            .build())
                    .quantity(productDetail.getQuantity())
                    .description(productDetail.getDescription())
                    .build();
            productDetailRepository.save(productDetail1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Boolean updateProductDetail(ProductDetail productDetail) {
        try {
            ProductDetail productDetail1 = ProductDetail.builder()
                    .productDetailId(productDetail.getProductDetailId())
                    .products(Products.builder()
                            .productId(productDetail.getProducts().getProductId())
                            .build())
                    .colors(Colors.builder()
                            .colerId(productDetail.getColors().getColerId())
                            .build())
                    .sizes(Sizes.builder()
                            .sizesId(productDetail.getSizes().getSizesId())
                            .build())
                    .quantity(productDetail.getQuantity())
                    .description(productDetail.getDescription())
                    .build();
            productDetailRepository.save(productDetail1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteProductDetail(Long id) {
        try {
            productDetailRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Optional<ProductDetail> finbyId(Long id) {
        return productDetailRepository.findById(id);
    }
}

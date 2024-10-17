package com.example.demo.service.impl;

import com.example.demo.dto.response.ProductResponse;
import com.example.demo.model.Brands;
import com.example.demo.model.Categories;
import com.example.demo.model.Colors;
import com.example.demo.model.Marterial;
import com.example.demo.model.ProductDetail;
import com.example.demo.model.Products;
import com.example.demo.model.Sizes;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Page<ProductResponse> getAll(Pageable pageable) {
        return productRepository.getAll(pageable);
    }

    @Override
    public Page<Products> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Boolean createProduct(Products products) {
        try {
            Products products1 = Products.builder()
                    .productName(products.getProductName())
                    .description(products.getDescription())
                    .categories(Categories.builder()
                            .categoriesId(products.getCategories().getCategoriesId())
                            .build())
                    .discountPrice(products.getDiscountPrice())
                    .unitPrice(products.getUnitPrice())
                    .isDiscount(products.getIsDiscount())
                    .isSpecial(products.getIsSpecial())
                    .marterial(Marterial.builder()
                            .materialId(products.getMarterial().getMaterialId())
                            .build())
                    .brands(Brands.builder()
                            .brandId(products.getBrands().getBrandId())
                            .build())
                    .weight(products.getWeight())
                    .build();
            productRepository.save(products1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateProduct(Products products) {
        try {
            Products products1 = Products.builder()
                    .productId(products.getProductId())
                    .productName(products.getProductName())
                    .description(products.getDescription())
                    .categories(Categories.builder()
                            .categoriesId(products.getCategories().getCategoriesId())
                            .build())
                    .discountPrice(products.getDiscountPrice())
                    .unitPrice(products.getUnitPrice())
                    .isDiscount(products.getIsDiscount())
                    .isSpecial(products.getIsSpecial())
                    .marterial(Marterial.builder()
                            .materialId(products.getMarterial().getMaterialId())
                            .build())
                    .brands(Brands.builder()
                            .brandId(products.getBrands().getBrandId())
                            .build())
                    .weight(products.getWeight())
                    .build();
            productRepository.save(products1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteProduct(String id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

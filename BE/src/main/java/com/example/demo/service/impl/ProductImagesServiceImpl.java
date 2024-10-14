package com.example.demo.service.impl;

import com.example.demo.model.Colors;
import com.example.demo.model.ProductImages;
import com.example.demo.model.Products;
import com.example.demo.repository.ProductImagesRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class ProductImagesServiceImpl implements ProductImagesService {

    @Autowired
    private ProductImagesRepository productImagesRepository;


    @Override
    public Page<ProductImages> getAll(Pageable pageable) {
        return productImagesRepository.findAll(pageable);
    }

    @Override
    public Boolean createProductImages(ProductImages productImages) {

        int random = new Random().nextInt(10000);
        try {
            ProductImages productImages1 = ProductImages.builder()
                    .imageId("image" + random)
                    .imageUrl(productImages.getImageUrl())
                    .products(Products.builder()
                            .productId(productImages.getProducts().getProductId())
                            .build())
                    .build();
            productImagesRepository.save(productImages1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public Boolean updateProductImages(ProductImages productImages) {
//        int random = new Random().nextInt(10000);
        try {
            ProductImages productImages1 = ProductImages.builder()
                    .imageId(productImages.getImageId())
                    .imageUrl(productImages.getImageUrl())
                    .products(Products.builder()
                            .productId(productImages.getProducts().getProductId())
                            .build())
                    .build();
            productImagesRepository.save(productImages1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteProductImages(String id) {
        try {
            productImagesRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Optional<ProductImages> finbyId(String id) {
        return productImagesRepository.findById(id);
    }
}

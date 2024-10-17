package com.example.demo.service;

import com.example.demo.model.Colors;
import com.example.demo.model.ProductImages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ProductImagesService {
    Page<ProductImages> getAll (Pageable pageable);
    Boolean createProductImages (ProductImages productImages);
    Boolean updateProductImages (ProductImages productImages );
    Boolean deleteProductImages (String id );
    Optional<ProductImages> finbyId (String id);
}

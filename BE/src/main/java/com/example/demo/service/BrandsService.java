package com.example.demo.service;

import com.example.demo.model.Brands;
import com.example.demo.model.Colors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BrandsService {
    Page<Brands> getAll(Pageable pageable);

    Boolean createBrands(Brands brands);

    Boolean updateBrands(Brands brands);

    Boolean deleteBrands(Long id);

    Optional<Brands> finbyId(Long id);
}

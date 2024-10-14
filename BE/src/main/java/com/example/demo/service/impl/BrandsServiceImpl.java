package com.example.demo.service.impl;

import com.example.demo.model.Brands;
import com.example.demo.repository.BrandsRepository;
import com.example.demo.service.BrandsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BrandsServiceImpl implements BrandsService {
    @Autowired
    private BrandsRepository brandsRepository;


    @Override
    public Page<Brands> getAll(Pageable pageable) {
        return brandsRepository.findAll(pageable);
    }

    @Override
    public Boolean createBrands(Brands brands) {
        try {
            Brands brands1 = Brands.builder()
                    .brandName(brands.getBrandName())
                    .brandLogo(brands.getBrandLogo())
                    .build();
            brandsRepository.save(brands1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateBrands(Brands brands) {
        try {
            Brands brands1 = Brands.builder()
                    .brandId(brands.getBrandId())
                    .brandName(brands.getBrandName())
                    .brandLogo(brands.getBrandLogo())
                    .build();
            brandsRepository.save(brands1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteBrands(Long id) {
        try {
            brandsRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Optional<Brands> finbyId(Long id) {
        return brandsRepository.findById(id);
    }
}

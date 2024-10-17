package com.example.demo.service.impl;

import com.example.demo.model.Categories;
import com.example.demo.model.Marterial;
import com.example.demo.repository.CategoriesRepositori;
import com.example.demo.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoriesServiceImpl implements CategoriesService {
    @Autowired
    private CategoriesRepositori categoriesRepositori;


    @Override
    public Page<Categories> getAll(Pageable pageable) {
        return categoriesRepositori.findAll(pageable);
    }

    @Override
    public Boolean createCategories(Categories categories) {
        try {
            Categories categories1 = Categories.builder()
                    .categoriesName(categories.getCategoriesName())
                    .build();
            categoriesRepositori.save(categories1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateCategories(Categories categories) {
        try {
            Categories categories1 = Categories.builder()
                    .categoriesId(categories.getCategoriesId())
                    .categoriesName(categories.getCategoriesName())
                    .build();
            categoriesRepositori.save(categories1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteCategories(Long id) {
        try {
            categoriesRepositori.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;

        }
    }

    @Override
    public Optional<Categories> finbyId(Long id) {
        return categoriesRepositori.findById(id);
    }
}

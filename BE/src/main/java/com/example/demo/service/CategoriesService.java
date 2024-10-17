package com.example.demo.service;

import com.example.demo.model.Categories;
import com.example.demo.model.Marterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CategoriesService {

    Page<Categories> getAll(Pageable pageable);

    Boolean createCategories(Categories categories);

    Boolean updateCategories(Categories categories);

    Boolean deleteCategories(Long id);

    Optional<Categories> finbyId(Long id);
}

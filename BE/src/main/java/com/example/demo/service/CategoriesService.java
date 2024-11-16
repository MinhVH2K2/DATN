package com.example.demo.service;

import com.example.demo.model.Categories;
import com.example.demo.model.Marterial;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

public interface CategoriesService {

    Page<Categories> getAll(Pageable pageable);

    Boolean createCategories(Categories categories);

    Boolean updateCategories(Categories categories);

    Boolean deleteCategories(String id);

    Optional<Categories> finbyId(String id);
}

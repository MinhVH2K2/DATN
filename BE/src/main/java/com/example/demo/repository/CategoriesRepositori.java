package com.example.demo.repository;

import com.example.demo.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepositori extends JpaRepository<Categories, Long> {
}

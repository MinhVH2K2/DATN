package com.example.demo.repository;

import com.example.demo.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoriesRepositori extends JpaRepository<Categories, String> {
}

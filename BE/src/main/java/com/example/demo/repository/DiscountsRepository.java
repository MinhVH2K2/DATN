package com.example.demo.repository;

import com.example.demo.model.Discounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiscountsRepository extends JpaRepository<Discounts, String> {

}

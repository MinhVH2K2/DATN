package com.example.demo.repository;

import com.example.demo.model.Marterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarteriaRepository extends JpaRepository<Marterial, Long> {
}

package com.example.demo.repository;

import com.example.demo.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo  extends JpaRepository<Products,Long> , JpaSpecificationExecutor<Products> {

    Products findByProductCode(String productCode);
}

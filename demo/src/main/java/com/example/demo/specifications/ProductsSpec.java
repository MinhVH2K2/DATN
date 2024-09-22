package com.example.demo.specifications;

import com.example.demo.model.Products;
import org.springframework.data.jpa.domain.Specification;

public class ProductsSpec {
    public static Specification<Products> containsCodeName(String codeName){
        return (root,query,criteriaBuilder) -> criteriaBuilder.like(root.get("productCode"),"%"+codeName+"%");

    }
}

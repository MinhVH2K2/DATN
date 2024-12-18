package com.example.demo.service.impl;

import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.model.Brands;
import com.example.demo.model.Categories;
import com.example.demo.model.Colors;
import com.example.demo.model.Marterial;
import com.example.demo.model.ProductDetail;
import com.example.demo.model.Products;
import com.example.demo.model.Sizes;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Page<ProductResponse> getAll(Pageable pageable) {
        return productRepository.getAll(pageable);
    }

    @Override
    public Page<Products> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Boolean createProduct(Products products) {
        try {
            Products products1 = Products.builder()
                    .productName(products.getProductName())
                    .description(products.getDescription())
                    .categories(Categories.builder()
                            .categoriesId(products.getCategories().getCategoriesId())
                            .build())
                    .discountPrice(products.getDiscountPrice())
                    .unitPrice(products.getUnitPrice())
                    .isDiscount(products.getIsDiscount())
                    .isSpecial(products.getIsSpecial())
                    .marterial(Marterial.builder()
                            .materialId(products.getMarterial().getMaterialId())
                            .build())
                    .brands(Brands.builder()
                            .brandId(products.getBrands().getBrandId())
                            .build())
                    .weight(products.getWeight())
                    .build();
            productRepository.save(products1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateProduct(Products products) {
        try {
            Products products1 = Products.builder()
                    .productId(products.getProductId())
                    .productName(products.getProductName())
                    .description(products.getDescription())
                    .categories(Categories.builder()
                            .categoriesId(products.getCategories().getCategoriesId())
                            .build())
                    .discountPrice(products.getDiscountPrice())
                    .unitPrice(products.getUnitPrice())
                    .isDiscount(products.getIsDiscount())
                    .isSpecial(products.getIsSpecial())
                    .marterial(Marterial.builder()
                            .materialId(products.getMarterial().getMaterialId())
                            .build())
                    .brands(Brands.builder()
                            .brandId(products.getBrands().getBrandId())
                            .build())
                    .weight(products.getWeight())
                    .build();
            productRepository.save(products1);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteProduct(String id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public PageResponse<?> getAllProductByMutipleColums(int pageNo, int pageSize, String categories, String nameProducts, String id) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Specification<Products> spec = Specification.where((root, query, criteriaBuilder) ->
                {
                    if (categories == null) {
                        return criteriaBuilder.conjunction(); // Trả về conjunction để không lọc gì nếu categories là null
                    } else {
                        Join<Products, Categories> joinTable = root.join("categories", JoinType.INNER);
                        return criteriaBuilder.like(joinTable.get("categoriesName"), "%" + categories + "%");
                    }
                }

        );
<<<<<<< HEAD
        Specification<Products> hasName = Specification.where((root, query, criteriaBuilder) ->
                {
                    if (nameProducts == null) {
                        return criteriaBuilder.conjunction(); // Trả về conjunction để không lọc gì nếu nameproducts là null
                    } else {
                        return criteriaBuilder.like(root.get("productName"), "%" + nameProducts + "%");
                    }
                }
                // criteriaBuilder.like(root.get("productName"),"%" + nameProducts + "%")
        );
//        Specification<Products> hasId = Specification.where((root, query, criteriaBuilder) ->
//                criteriaBuilder.equal(root.get("productId"), id)
//        );
        Specification<Products> finalSpec = spec.and(hasName);
=======
//        Specification<Products> hasName = Specification.where((root, query, criteriaBuilder) ->
//                criteriaBuilder.like(root.get("productName"),"%" + nameProducts + "%")
//        );
//        Specification<Products> hasId = Specification.where((root, query, criteriaBuilder) ->
//                criteriaBuilder.equal(root.get("productId"), id)
//        );
//        Specification<Products> finalSpec = spec.and(hasName);
>>>>>>> 37c46b033526ccd1b349e77086d69c03aab5a91c

        Page<Products> lists = productRepository.findAll(spec, pageable);

<<<<<<< HEAD
        List<Products> productsList = lists.stream().map(list -> Products.builder()
                .productId(list.getProductId())
                .productName(list.getProductName())
                .productIng(list.getProductIng())
                .categories(list.getCategories())
                .unitPrice(list.getUnitPrice())
                .description(list.getDescription())
                .productDetails(list.getProductDetails())
                .build()).toList();
=======
       List<Products> productsList= lists.stream().map(list -> Products.builder()
               .productId(list.getProductId())
               .productName(list.getProductName())
               .categories(list.getCategories())
               .productDetails(list.getProductDetails())
               .build()).toList();
>>>>>>> 37c46b033526ccd1b349e77086d69c03aab5a91c

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPage(lists.getTotalPages())
                .data(productsList)
                .build();
    }
}

package com.example.demo.service;

import com.example.demo.dto.response.PageResponse;
import com.example.demo.dto.response.ProductResponse;
import com.example.demo.model.Products;
import com.example.demo.repository.ProductRepo;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Builder
public class ProductService {
    @Autowired
    ProductRepo productRepo;

    public PageResponse<?> getAll(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Products> listProductsPage = productRepo.findAll(pageable);
        List<ProductResponse> productsList = listProductsPage.stream().map(products -> ProductResponse.builder()
                .id(products.getId())
                .productCode(products.getProductCode())
                .productName(products.getProductName())
                .madeIn(products.getMadeIn())
                .describe(products.getDescribe())
                .thumbnail(products.getThumbnail())
                .weight(products.getWeight())
                .price(products.getPrice())
                .fabrics(products.getFabrics())
                .catergories(products.getCatergories())
                .productStatus(products.getProductStatus())
                .build()).toList();

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPage(listProductsPage.getTotalPages())
                .data(productsList)
                .build();
    }

    public Long saveProduct(Products products) throws Exception {

        Products product = productRepo.findByProductCode(products.getProductCode());
        System.out.println(product);
        if (product != null) {
            throw new Exception("Mã đã tồn tại");
        } else {
            productRepo.save(products);
        }

        return products.getId();
    }

    public Products getProductByCodeName(String codeName) throws Exception {
        System.out.println(codeName);
        Products product = productRepo.findByProductCode(codeName);

        System.out.println(product);
        if (product == null) {
            throw new Exception("Sản phẩm không tồn tại");
        } else {
            return product;
        }
    }

    public Optional<Products> getProductById(Long id) throws Exception {
        // return Optional.ofNullable(productRepo.findById(id).orElseThrow(() -> new Exception("Sản phẩm không tồn tại")));
        return productRepo.findById(id);

    }

    public Optional<Products> test(String codeName) throws Exception {
        Specification<Products> specification = Specification.where((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("productCode"), codeName));
        return Optional.ofNullable(productRepo.findOne(specification).orElseThrow(() -> new Exception("Mã không tồn tại")));
    }

    public void upDateProduct(Long id, Products upDateProducts) throws Exception {
        Optional<Products> product = getProductById(id);
        product.get().setProductName(upDateProducts.getProductName());
        product.get().setMadeIn(upDateProducts.getMadeIn());
        product.get().setDescribe(upDateProducts.getDescribe());
        product.get().setThumbnail(upDateProducts.getThumbnail());
        product.get().setWeight(upDateProducts.getWeight());
        product.get().setProductStatus(upDateProducts.getProductStatus());
        product.get().setFabrics(upDateProducts.getFabrics());
        product.get().setCatergories(upDateProducts.getCatergories());
        //productRepo.save(Products<product>);

    }

}

package com.example.demo.controller;

import com.example.demo.dto.response.ResponseDataSuccsess;
import com.example.demo.model.Products;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getall-product")
    public ResponseEntity<?> getAll(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 5);
        return new ResponseEntity<>(productService.getAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseDataSuccsess<?> getAllProduct(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 50);
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "ok", productService.getAllProduct(pageable));
    }

    @PostMapping("/add")
    public ResponseDataSuccsess<?> add(@RequestBody Products products) {
        if (
                products.getProductName().trim().length() == 0 ||
                        products.getDescription().trim().length() == 0 ||
                        products.getCategories() == null ||
                        products.getDiscountPrice() == 0 ||
                        products.getUnitPrice() == 0 ||
                        products.getIsSpecial() == 0 ||
                        products.getIsDiscount() == 0 ||
                        products.getMarterial() == null ||
                        products.getBrands() == null ||
                        products.getWeight() == 0
        ) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value(), "thất bại ");
        }
        productService.createProduct(products);
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "thành công ");

    }
    @PutMapping("/update")
    public ResponseDataSuccsess<?> update(@RequestBody Products products) {
        if (
                products.getProductName().trim().length() == 0 ||
                        products.getDescription().trim().length() == 0 ||
                        products.getCategories() == null ||
                        products.getDiscountPrice() == 0 ||
                        products.getUnitPrice() == 0 ||
                        products.getIsSpecial() == 0 ||
                        products.getIsDiscount() == 0 ||
                        products.getMarterial() == null ||
                        products.getBrands() == null ||
                        products.getWeight() == 0
        ) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value(), "thất bại ");
        }
        productService.updateProduct(products);
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "thành công ");

    }
    @DeleteMapping("/delete/{id}")
    public ResponseDataSuccsess<?> delete(@PathVariable String id) {
        Boolean check = productService.deleteProduct(id);
        if (check == false) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value(), "thất bại ");
        }
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "thành công");
    }
}

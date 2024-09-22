package com.example.demo.controller;

import com.example.demo.dto.response.ResponseDataSuccsess;
import com.example.demo.model.Products;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping("product")
    ResponseDataSuccsess<?> getAllProduct(@RequestParam(defaultValue = "0", required = false) int pageNo, @RequestParam(defaultValue = "5", required = false) int pageSize) {

        return new ResponseDataSuccsess(HttpStatus.OK.value(), "DANH SACH SAN PHAM", productService.getAll(pageNo, pageSize));

    }

    @PostMapping("addproduct")
    ResponseDataSuccsess<?> addProduct(@RequestBody Products products) {
        try {
            productService.saveProduct(products);
            return new ResponseDataSuccsess(HttpStatus.OK.value(), "Add product Susscess", products.getId());
        } catch (Exception e) {
            return new ResponseDataSuccsess(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }

    }

    @GetMapping("getproductbycodename")
    ResponseDataSuccsess<?> getProductByCodeName(@RequestParam(required = false) String codeName) throws Exception {
        try {
            return new ResponseDataSuccsess(HttpStatus.OK.value(), "San pham can tim", productService.getProductByCodeName(codeName));
        } catch (Exception e) {
            return new ResponseDataSuccsess(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }
    }

    @GetMapping("getproductbyid/{id}")
    ResponseDataSuccsess getProductById(@PathVariable Long id) {
        try {
            return new ResponseDataSuccsess(HttpStatus.OK.value(), "San pham can tim", productService.getProductById(id));
        } catch (Exception e) {
            return new ResponseDataSuccsess(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        }

    }

}

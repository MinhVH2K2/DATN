package com.example.demo.controller;

import com.example.demo.dto.response.ResponseDataSuccsess;
import com.example.demo.model.ProductDetail;
import com.example.demo.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/product-detail")
public class ProductDetailController {
    @Autowired
    private ProductDetailService productDetailService;

    @GetMapping("/getall")
    public ResponseDataSuccsess<?> getAll(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 5);
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "thành công ", productDetailService.getAll(pageable));
    }

    @PostMapping("/add")
    public ResponseDataSuccsess<?> add(@RequestBody ProductDetail productDetail) {
        if (
                productDetail.getProducts().getProductId().trim().length() == 0 ||
                        productDetail.getColors().getColerId() == null ||
                        productDetail.getSizes().getSizesId() == null ||
                        productDetail.getQuantity() == null ||
                        productDetail.getDescription() == null) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value(), "dữ liệu không được để trống ");
        }
        productDetailService.createProductDetail(productDetail);
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "thành công ");
    }

    @PutMapping("/update")
    public ResponseDataSuccsess<?> update(@RequestBody ProductDetail productDetail) {
        if (
                productDetail.getProductDetailId() == null ||
                        productDetail.getProducts().getProductId().trim().length() == 0 ||
                        productDetail.getColors().getColerId() == null ||
                        productDetail.getSizes().getSizesId() == null ||
                        productDetail.getQuantity() == null ||
                        productDetail.getDescription() == null) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value(), "dữ liệu không được để trống ");
        }
        productDetailService.updateProductDetail(productDetail);
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "thành công ");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseDataSuccsess<?> delete(@PathVariable Long id) {
        Boolean check = productDetailService.deleteProductDetail(id);
        if (check == false) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value(), "thất bại ");
        }
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "thành công");
    }


}

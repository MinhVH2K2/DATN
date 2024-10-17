package com.example.demo.controller;

import com.example.demo.model.Colors;
import com.example.demo.model.ProductImages;
import com.example.demo.service.ProductImagesService;
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

import java.util.Optional;

@Controller
@RequestMapping("/product-images")
public class ProductImadesController {
    @Autowired
    private ProductImagesService productImagesService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 5);
        return new ResponseEntity<>(productImagesService.getAll(pageable), HttpStatus.OK);
    }

    @PostMapping("/add-product-images")
    public ResponseEntity<?> add(@RequestBody ProductImages productImages) {
        if (productImages.getImageUrl().trim().length() == 0
                || productImages.getProductDetail().getProductDetailId() == 0
                || productImages.getIsThumbnail() == 0
        ) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        boolean check = productImagesService.createProductImages(productImages);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công ", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-product-images")
    public ResponseEntity<?> update(@RequestBody ProductImages productImages) {
        if (productImages.getImageUrl().trim().length() == 0
                ||productImages.getProductDetail().getProductDetailId() == 0
                || productImages.getIsThumbnail() == 0
                || productImages.getImageId().trim().length() == 0
        ) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        boolean check = productImagesService.updateProductImages(productImages);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công ", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete-product-images/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        boolean check = productImagesService.deleteProductImages(id);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công ", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/finbyid-product-images/{id}")
    public ResponseEntity<?> finById(@PathVariable String id) {
        Optional<ProductImages> productImages = productImagesService.finbyId(id);
        if (productImages.isPresent()) {
            return new ResponseEntity<>(productImages.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("không tìm thấy ", HttpStatus.NOT_FOUND);
        }
    }
}

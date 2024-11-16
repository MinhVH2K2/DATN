package com.example.demo.controller;


import com.example.demo.model.Brands;
import com.example.demo.model.Categories;
import com.example.demo.service.BrandsService;
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
@RequestMapping("/Brands")
public class BrandsController {
    @Autowired
    private BrandsService brandsService;


    @GetMapping("/getAll-brands")
    public ResponseEntity<?> getAll(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 10000);
        return new ResponseEntity<>(brandsService.getAll(pageable).getContent(), HttpStatus.OK);
    }

    @PostMapping("/add-brands")
    public ResponseEntity<?> add(@RequestBody Brands brands) {
        if (brands.getBrandName().trim().length() == 0 || brands.getBrandLogo().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = brandsService.createBrands(brands);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công ", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-brands")
    public ResponseEntity<?> update(@RequestBody Brands brands) {
        if (brands.getBrandName().trim().length() == 0 ||
                brands.getBrandLogo().trim().length() == 0
                || brands.getBrandId() == null) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = brandsService.updateBrands(brands);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công ", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete-brands/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Boolean check = brandsService.deleteBrands(id);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == false ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/finbyid-brands/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        Optional<Brands> brands = brandsService.finbyId(id);
        if (brands.isPresent()) {
            return new ResponseEntity<>(brands.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("không tìm thấy ", HttpStatus.NOT_FOUND);
        }
    }
}

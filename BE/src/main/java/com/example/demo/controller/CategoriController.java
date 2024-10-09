package com.example.demo.controller;

import com.example.demo.model.Categories;
import com.example.demo.model.Marterial;
import com.example.demo.service.CategoriesService;
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
@RequestMapping("/categori")
public class CategoriController {
    @Autowired
    private CategoriesService categoriesService;

    @GetMapping("/getAll-categori")
    public ResponseEntity<?> getAll(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 5);
        return new ResponseEntity<>(categoriesService.getAll(pageable).getContent(), HttpStatus.OK);
    }

    @PostMapping("/add-categori")
    public ResponseEntity<?> add(@RequestBody Categories categories) {
        if (categories.getCategoriesName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = categoriesService.createCategories(categories);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-category")
    public ResponseEntity<?> update(@RequestBody Categories categories) {
        if (categories.getCategoriesName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = categoriesService.updateCategories(categories);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete-categori/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Boolean check = categoriesService.deleteCategories(id);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == false ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/finbyid-categori/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        Optional<Categories> categori = categoriesService.finbyId(id);
        if (categori.isPresent()) {
            return new ResponseEntity<>(categori.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("không tìm thấy ", HttpStatus.NOT_FOUND);
        }
    }

}

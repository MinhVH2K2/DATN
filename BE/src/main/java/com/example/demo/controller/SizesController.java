package com.example.demo.controller;

import com.example.demo.model.Colors;
import com.example.demo.model.Sizes;
import com.example.demo.service.SizesService;
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
@RequestMapping("/sizes")
public class SizesController {
    @Autowired
    private SizesService sizesService;

    @GetMapping("/getAll-sizes")
    public ResponseEntity<?> getAll(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 5);
        return new ResponseEntity<>(sizesService.getAll(pageable).getContent(), HttpStatus.OK);
    }

    @PostMapping("/add-sizes")
    public ResponseEntity<?> add(@RequestBody Sizes sizes) {
        if (sizes.getSizesName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = sizesService.createSizes(sizes);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-sizes")
    public ResponseEntity<?> update(@RequestBody Sizes sizes) {
        if (sizes.getSizesName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = sizesService.createSizes(sizes);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete-sizes/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Boolean check = sizesService.deleteSizes(id);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == false ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/finbyid-sizes/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        Optional<Sizes> sizes = sizesService.finbyId(id);
        if (sizes.isPresent()) {
            return new ResponseEntity<>(sizes.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("không tìm thấy ", HttpStatus.NOT_FOUND);
        }
    }

}

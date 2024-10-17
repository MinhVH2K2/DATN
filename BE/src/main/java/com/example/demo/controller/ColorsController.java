package com.example.demo.controller;

import com.example.demo.model.Colors;
import com.example.demo.service.ColorsService;
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
@RequestMapping("/colors")
public class ColorsController {
    @Autowired
    private ColorsService colorsService;


    @GetMapping("/getAll-corler")
    public ResponseEntity<?> getAll(@RequestParam("p") Optional<Integer> number) {
        Pageable pageable = PageRequest.of(number.orElse(0), 5);
        return new ResponseEntity<>(colorsService.getAll(pageable).getContent(), HttpStatus.OK);
    }

    @PostMapping("/add-corler")
    public ResponseEntity<?> add(@RequestBody Colors colors) {
        if (colors.getCorlorName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = colorsService.createColors(colors);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-corler")
    public ResponseEntity<?> update(@RequestBody Colors colors) {
        if (colors.getCorlorName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = colorsService.updateColors(colors);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công ", check == false ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @DeleteMapping("/delete-corler/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Boolean check = colorsService.deleteColors(id);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == false ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/finbyid-corler/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        Optional<Colors> colors = colorsService.finbyId(id);
        if (colors.isPresent()) {
            return new ResponseEntity<>(colors.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("không tìm thấy ", HttpStatus.NOT_FOUND);
        }
    }


}

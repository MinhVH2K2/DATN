package com.example.demo.controller;

import com.example.demo.service.ColorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/colors")
public class ColorsController {
    @Autowired
    private ColorsService colorsService ;


    @GetMapping("/getAll")
    public ResponseEntity<?> getAll (@RequestParam("p")Optional<Integer> number){
        Pageable pageable = PageRequest.of(number.orElse(0) , 5);
        return new ResponseEntity<>(colorsService.getAll(pageable).getContent() , HttpStatus.OK) ;
    }
}

package com.example.demo.controller;

import com.example.demo.model.Sizes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.SizesService;

import java.util.List;

@RestController
@RequestMapping("/")
public class SizesController {
    @Autowired
    SizesService sizesService;

    @GetMapping("sizes")
    List<Sizes> getAll() {
        return sizesService.getAll();
    }


}

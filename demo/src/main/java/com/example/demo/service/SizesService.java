package com.example.demo.service;

import com.example.demo.model.Sizes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.SizesRepo;

import java.util.List;

@Service
public class SizesService {
    @Autowired
    SizesRepo sizesRepo;
    public  List<Sizes>  getAll(){
        List<Sizes> sizesList = sizesRepo.findAll();
        return sizesList;

    }
}

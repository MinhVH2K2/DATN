package com.example.demo.controller;

import com.example.demo.model.Marterial;
import com.example.demo.model.Sizes;
import com.example.demo.service.MarterialService;
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
@RequestMapping("/Marterial")
public class    MarterialController {

    @Autowired
    private MarterialService marterialService;

    @GetMapping("/getAll-marterial")
    public ResponseEntity<?> getAll(@RequestParam("p") Optional<Integer> p) {
        Pageable pageable = PageRequest.of(p.orElse(0), 10000);
        return new ResponseEntity<>(marterialService.getAll(pageable).getContent(), HttpStatus.OK);
    }

    @PostMapping("/add-marterial")
    public ResponseEntity<?> add(@RequestBody Marterial marterial) {
        if (marterial.getMaterialName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = marterialService.createMarterial(marterial);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-marteiral")
    public ResponseEntity<?> update(@RequestBody Marterial marterial) {
        if (marterial.getMaterialName().trim().length() == 0) {
            return new ResponseEntity<>("không được để trống ", HttpStatus.BAD_REQUEST);
        }
        Boolean check = marterialService.createMarterial(marterial);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == true ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete-marteiral/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Boolean check = marterialService.deleteMarterial(id);
        return new ResponseEntity<>(check == false ? "thất bại " : "thành công", check == false ? HttpStatus.BAD_REQUEST : HttpStatus.OK);
    }

    @GetMapping("/finbyid-marterial/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        Optional<Marterial> sizes = marterialService.finbyId(id);
        if (sizes.isPresent()) {
            return new ResponseEntity<>(sizes.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("không tìm thấy ", HttpStatus.NOT_FOUND);
        }
    }
}

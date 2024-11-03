package com.example.demo.controller;

import com.example.demo.dto.response.DiscountResponse;
import com.example.demo.model.Discounts;
import com.example.demo.service.DiscountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("discounts")
public class DiscountsController {

    @Autowired
    private DiscountsService discountService;

    @GetMapping("/all-discounts")
    public ResponseEntity<DiscountResponse<Discounts>> getAllDiscounts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        DiscountResponse<Discounts> discountsResponse = discountService.findAllDiscount(pageable);
        return new ResponseEntity<>(discountsResponse, HttpStatus.OK);
    }

    @PostMapping("/add-discounts")
    public ResponseEntity<Discounts> createDiscount(@RequestBody Discounts discounts) {
        return discountService.createDiscount(discounts);
    }

    @PutMapping("/update-discount")
    public ResponseEntity<?> updateDiscount(@RequestBody Discounts updatedDiscount) {
        if (updatedDiscount == null || updatedDiscount.getDiscountId() == null || updatedDiscount.getDiscountId().isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Dữ liệu giảm giá không hợp lệ. Mã giảm giá không được để trống hoặc rỗng.");
        }
        return discountService.updateDiscount(updatedDiscount);
    }

    @DeleteMapping("delete/{discountId}")
    public ResponseEntity<?> deleteDiscount(@PathVariable String discountId) {
        return discountService.deleteDiscount(discountId);
    }

}

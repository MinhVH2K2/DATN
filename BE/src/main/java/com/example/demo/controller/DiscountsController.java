package com.example.demo.controller;

import com.example.demo.model.Discounts;
import com.example.demo.service.DiscountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Page<Discounts> getAllDiscounts(Pageable pageable) {
        return discountService.findAllDiscounts(pageable);
    }

    // Phương thức để tìm mã giảm giá theo ID
//    @GetMapping("/{discountId}")
//    public ResponseEntity<Discounts> getDiscountById(@PathVariable String discountId) {
//        return discountService.findDiscountById(discountId);
//    }

    // Phương thức để tìm mã giảm giá theo giá trị
//    @GetMapping("/value/{discountValue}")
//    public ResponseEntity<Discounts> getDiscountByValue(@PathVariable int discountValue) {
//        return discountService.findDiscountByValue(discountValue);
//    }

    // Phương thức để tạo mã giảm giá mới
    @PostMapping("/add-discounts")
    public ResponseEntity<Discounts> createDiscount(@RequestBody Discounts discounts) {
        return discountService.createDiscount(discounts);
    }

    @PutMapping("/update-discount")
    public ResponseEntity<?> updateDiscount(@RequestBody Discounts updatedDiscount) {
        if (updatedDiscount == null || updatedDiscount.getDiscountId() == null || updatedDiscount.getDiscountId().isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid discount data. Discount ID must not be null or empty.");
        }

        return discountService.updateDiscount(updatedDiscount);
    }

    @DeleteMapping("delete/{discountId}")
    public ResponseEntity<?> deleteDiscount(@PathVariable String discountId) {
        return discountService.deleteDiscount(discountId);
    }

}

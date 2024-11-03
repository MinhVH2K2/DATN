package com.example.demo.service;

import com.example.demo.dto.response.DiscountResponse;
import com.example.demo.model.Discounts;
import com.example.demo.repository.DiscountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DiscountsService {

    @Autowired
    private DiscountsRepository discountsRepo;

    public DiscountResponse<Discounts> findAllDiscount(Pageable pageable) {
        Page<Discounts> pageDiscounts = discountsRepo.findAll(pageable);
        DiscountResponse<Discounts> response = DiscountResponse.<Discounts>builder()
                .pageNo(pageDiscounts.getNumber()).pageSize(pageDiscounts.getSize())
                .totalElements(pageDiscounts.getTotalElements())
                .totalPages(pageDiscounts.getTotalPages())
                .data(pageDiscounts.getContent())
                .build();
        return response;
    }

    public ResponseEntity<Discounts> createDiscount(Discounts discounts) {
        try {
            Discounts savedDiscount = discountsRepo.save(discounts);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(savedDiscount);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .build();
        }
    }

    public ResponseEntity<Discounts> updateDiscount(Discounts updatedDiscount) {
        try {
            Optional<Discounts> existingDiscount = discountsRepo.findById(updatedDiscount.getDiscountId());
            System.out.println(updatedDiscount.getDiscountId());
            if (existingDiscount.isPresent()) {
                Discounts discount = existingDiscount.get();
                discount.setDiscountValue(updatedDiscount.getDiscountValue());
                discount.setDiscountType(updatedDiscount.getDiscountType());
                discount.setStartDate(updatedDiscount.getStartDate());
                discount.setEndDate(updatedDiscount.getEndDate());
                discount.setStatus(updatedDiscount.getStatus());
                discount.setDescription(updatedDiscount.getDescription());
                discount.setCondition(updatedDiscount.getCondition());
                Discounts savedDiscount = discountsRepo.save(discount);
                return ResponseEntity
                        .status(HttpStatus.OK)
                        .body(savedDiscount);
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    public ResponseEntity<?> deleteDiscount(String discountId) {
        try {
            Optional<Discounts> existingDiscount = discountsRepo.findById(discountId);
            System.out.println(discountId);
            if (existingDiscount.isPresent()) {
                discountsRepo.delete(existingDiscount.get());
                return ResponseEntity
                        .status(HttpStatus.NO_CONTENT)
                        .body("Discount deleted successfully.");
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Discount not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete discount. Please try again later.");
        }
    }


}

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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.util.StringUtils;

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


    public ResponseEntity<?> createDiscount(Discounts discounts) {
        try {
            // Gọi hàm validate để kiểm tra lỗi
            List<String> validationErrors = validateDiscounts(discounts);

            // Nếu có lỗi, trả về BAD_REQUEST với danh sách lỗi
            if (!validationErrors.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(validationErrors);
            }

            // Thiết lập điều kiện mặc định
            discounts.setCondition(1);

            // Lưu discount vào repository
            Discounts savedDiscount = discountsRepo.save(discounts);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(savedDiscount);
        } catch (Exception e) {
            e.printStackTrace();

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
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
    public List<String> validateDiscounts(Discounts discounts) {
        List<String> errors = new ArrayList<>();

        if (discounts == null) {
            errors.add("Discount object cannot be null.");
            return errors;
        }

        if (!StringUtils.hasText(discounts.getDescription())) {
            errors.add("Description cannot be empty.");
        }

        if (discounts.getDiscountValue() == null || discounts.getDiscountValue() <= 0) {
            errors.add("Discount value must be greater than 0.");
        }

        if (!StringUtils.hasText(discounts.getDiscountType())) {
            errors.add("Discount type cannot be empty.");
        }

        if (discounts.getStartDate() == null) {
            errors.add("Start date cannot be null.");
        }

        if (discounts.getEndDate() == null) {
            errors.add("End date cannot be null.");
        }

        if (!StringUtils.hasText(discounts.getStatus())) {
            errors.add("Status cannot be empty.");
        }

        return errors;
    }

}

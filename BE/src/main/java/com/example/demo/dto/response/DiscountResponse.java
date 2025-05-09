package com.example.demo.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscountResponse<T> {
    private int pageNo;
    private int pageSize;
    private long totalElements;  // Changed to long to handle large data sets
    private int totalPages;
    private List<T> data;
}

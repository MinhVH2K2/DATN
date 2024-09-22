package com.example.demo.dto.response;

import com.example.demo.model.Catergories;
import com.example.demo.model.Fabrics;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String productCode;

    private String productName;

    private String madeIn;

    private String describe;

    private String thumbnail;

    private String weight;

    private Double price;

    private int productStatus;

    private Fabrics fabrics;

    private Catergories catergories;
}

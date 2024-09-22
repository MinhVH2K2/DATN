package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
@Builder
@ToString
public class Products extends AbstractEntity {
    @Column(name = "product_code")
    private String productCode;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "made_in")
    private String madeIn;

    @Column(name = "product_describe")
    private String describe;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "weight")
    private String weight;

    @Column(name = "price")
    private Double price;

    @Column(name = "product_status")
    private int productStatus;

    @ManyToOne
    @JoinColumn(name = "fabric_id")
    private Fabrics fabrics;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Catergories catergories;
}

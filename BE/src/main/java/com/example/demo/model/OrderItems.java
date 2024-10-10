package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "orderitems")
@Builder
public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long order_item_id;

    @Column(name = "order_id")
    private String order_id;

//    @Column(name = "product_detail_id")
//    private String product_detail_id;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "unit_price")
    private Double  unit_price;

    @Column(name = "discount_price")
    private Double  discount_price;

    @Column(name = "total_price")
    private Double  total_price;

}

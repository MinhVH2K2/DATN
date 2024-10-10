package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Discounts")
@Builder
public class Discounts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "discount_id")
    private String discount_id;

    @Column(name = "discount_value")
    private int discount_value;

    @Column(name = "discount_type")
    private String discount_type;

    @Column(name = "start_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date start_date;

    @Column(name = "end_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date end_date;

    @Column(name = "status")
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "condition")
    private int condition;
}

package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "discounts")
@Builder
public class Discounts {

    @Id
    @Column(name = "discount_id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String discountId;

    @Column(name = "discount_value")
    private Integer discountValue;

    @Column(name = "discount_type")
    private String discountType;

    @Column(name = "start_date")
    private LocalDateTime  startDate;

    @Column(name = "end_date")
    private LocalDateTime  endDate;

    @Column(name = "status")
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "`condition`")
    private Integer condition;

    @OneToMany(fetch = FetchType.LAZY , mappedBy = "discounts")
    @JsonIgnore
    private List<Orders> orders;
}

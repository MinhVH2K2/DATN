package com.example.demo.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "orders")
@Builder
@ToString
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    private String orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User customer;

//    @Column(name = "user_id")
//    private String userId;

    @ManyToOne
    @JoinColumn(name = "discount_id")
    private Discounts discounts;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "created_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

//    @ManyToOne
//    @JoinColumn(name = "created_by")
    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_date")
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedDate;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User updatedBy;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "orders")
    @JsonIgnore
    private List<OrderItems> orderItems = new ArrayList<>();

}

package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "Orders")
@Builder
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "order_id")
    private String order_id;

//    @Column(name = "user_id")
//    private String user_id;

    @Column(name = "discount_id")
    private String discount_id;

    @Column(name = "total_price")
    private Double total_price;

    @Column(name = "status")
    private String status;

    @Column(name = "created_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_date;

    @Column(name = "created_by")
    private String created_by;

    @Column(name = "updated_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_date;

    @Column(name = "updated_by")
    private String updated_by;

}

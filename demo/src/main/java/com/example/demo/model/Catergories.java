package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "categories")
public class Catergories{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "create_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_status")
    private String categoryStatus;

    @JsonIgnore
    @OneToMany(mappedBy = "catergories")
    private List<Products> products;
}

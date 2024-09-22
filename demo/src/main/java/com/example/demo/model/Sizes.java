package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sizes")
public class Sizes  extends AbstractEntity {

    private Long id;
    @Column(name = "size_code")
    private String sizeCode;

    @Column(name = "size_name")
    private String sizeName;

    @Column(name = "sizes_status")
    private Integer sizeStatus;

    @JsonIgnore
    @OneToMany(mappedBy ="sizes" )
    private List<ProductDetail> productDetail;




}

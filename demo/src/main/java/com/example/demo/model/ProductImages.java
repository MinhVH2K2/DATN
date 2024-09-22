package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product_images")
public class ProductImages extends AbstractEntity{

    @Column(name = "path_image")
    private String pathImage;

    @Column(name = "image_status")
    private Integer imageStatus;

}

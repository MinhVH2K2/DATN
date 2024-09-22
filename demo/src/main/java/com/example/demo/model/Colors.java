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
@Table(name = "colors")
public class Colors extends AbstractEntity {

    @Column(name = "color_code")
    private String colorCode;

    @Column(name = "color_name")
    private String colorName;

    @Column(name = "color_status")
    private Integer colorStatus;
}

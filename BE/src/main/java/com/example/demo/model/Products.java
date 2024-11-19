package com.example.demo.model;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "product_id")
    private String productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "description")
    private String description;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "discount_price")
    private Double discountPrice;

//    @Column(name = "productIng")
//    private String productIng;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "is_discount")
    private Double isDiscount;

    @Column(name = "is_special")
    private Double isSpecial;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "created_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;

    @Column(name = "updated_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateDate;

    //    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brands brands;
//
    @ManyToOne
    @JoinColumn(name = "material_id")
    private Marterial marterial;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categories categories;

    @OneToMany(mappedBy ="products" , cascade = CascadeType.ALL )
    private List<ProductDetail> productDetails ;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User userCreateBy;

    @ManyToOne
    @JoinColumn(name = "updated_by")
    private User userUpdateBy;


}

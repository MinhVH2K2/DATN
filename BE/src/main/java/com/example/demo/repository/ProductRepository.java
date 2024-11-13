package com.example.demo.repository;

import com.example.demo.dto.response.ProductResponse;
import com.example.demo.model.Products;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Products, String>, JpaSpecificationExecutor<Products> {
    @Query(value = "select products.product_id , products.product_name ,products.description,products.discount_price , products.unit_price ,\n" +
            "products.is_discount , products.is_special , products.weight , products.created_date , products.updated_date , brands.brand_id ,\n" +
            "brands.brand_name ,brands.logo , marterial.material_id , marterial.material_name , categories.category_id , categories.category_name ,\n" +
            "product_images.image_id , product_images.image_url , product_images.is_thumbnail , product_details.product_id , product_details.quantity,\n" +
            "product_details.description , sizes.size_id , sizes.size_name , colors.color_id , colors.color_name , colors.color_code\n" +
            "from products join brands on products.brand_id = brands.brand_id \n" +
            "join marterial on marterial.material_id = products.material_id \n" +
            "join categories on categories.category_id = products.category_id\n" +
            "join product_images on product_images.product_id = products.product_id\n" +
            "join product_details on product_details.product_id = products.product_id\n" +
            "join sizes on product_details.size_id = sizes.size_id \n" +
            "join colors on product_details.corlor_id = colors.color_id", nativeQuery = true)
    Page<ProductResponse> getAll(Pageable pageable);
}

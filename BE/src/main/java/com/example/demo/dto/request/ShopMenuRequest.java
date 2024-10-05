package com.example.demo.dto.request;

import jakarta.persistence.Column;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShopMenuRequest {

    private String menuName;

    private String description;
}

package com.example.demo.dto.request;

import com.example.demo.model.ShopMenu;
import lombok.*;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RolesRequest {

    private String roleName;

    private String roleCode;

    private String description;

    private List<ShopMenu> shopMenus;
}

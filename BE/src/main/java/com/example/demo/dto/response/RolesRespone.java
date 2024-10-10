package com.example.demo.dto.response;

import com.example.demo.model.ShopMenu;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolesRespone {
    private String roleId;
    private String roleName;
    List<String> shopMenus;
}

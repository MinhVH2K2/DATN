package com.example.demo.service;

import com.example.demo.dto.request.RolesRequest;
import com.example.demo.dto.response.RolesRespone;
import com.example.demo.model.Roles;
import com.example.demo.model.ShopMenu;
import com.example.demo.repository.RolesRepository;
import com.example.demo.repository.ShopMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RolesService {
    @Autowired
    RolesRepository rolesRepository;

    @Autowired
    ShopMenuRepository shopMenuRepository;

    public String addRoles(RolesRequest request) {
        Roles roles = Roles.builder()
                .roleName(request.getRoleName())
                .roleCode(request.getRoleCode())
                .description(request.getDescription())
                .shopMenus(request.getShopMenus())
                .build();
        List<Roles> list = List.of(roles);
        request.getShopMenus().forEach(shopMenu -> shopMenuRepository.findBymenuName(shopMenu.getMenuName()).orElseThrow().setRoles((list)));
        rolesRepository.save(roles);
        return request.getRoleName();
    }
    @PreAuthorize("hasRole('Sell')")
    public List<Roles> rolesList() {
        return rolesRepository.findAll();
    }

}

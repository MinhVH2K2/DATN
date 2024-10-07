package com.example.demo.service;

import com.example.demo.dto.request.ShopMenuRequest;
import com.example.demo.model.ShopMenu;
import com.example.demo.repository.ShopMenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShopMenuService {
    @Autowired
    ShopMenuRepository shopMenuRepository;

    public String addShopMenu(ShopMenuRequest request) {
        ShopMenu shopMenu = ShopMenu.builder()
                .menuName(request.getMenuName())
                .description(request.getDescription())
                .build();
        shopMenuRepository.save(shopMenu);
        return request.getMenuName();
    }

}

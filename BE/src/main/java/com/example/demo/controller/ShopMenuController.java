package com.example.demo.controller;

import com.example.demo.dto.request.ShopMenuRequest;
import com.example.demo.dto.response.ResponseDataSuccsess;
import com.example.demo.service.ShopMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class ShopMenuController {
    @Autowired
    ShopMenuService shopMenuService;

    @PostMapping("addshopmenu")
    public ResponseDataSuccsess<?> addshopmenu(@RequestBody ShopMenuRequest request){
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(),"ADD SHOP MENU",shopMenuService.addShopMenu(request));

    }
}

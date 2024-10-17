package com.example.demo.controller;

import com.example.demo.dto.request.UserRequest;
import com.example.demo.dto.response.ResponseDataSuccsess;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("adduser")
    public ResponseDataSuccsess<?> addUser(@RequestBody UserRequest request) {
        try {
            userService.addUser(request);
            return new ResponseDataSuccsess<>(HttpStatus.OK.value(), request.getUserName());
        } catch (Exception e) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value() , e.getMessage());

        }
    }
    @GetMapping("getuserbyusername")

    public ResponseDataSuccsess<?> addUser(@RequestParam String userName) {
        var authen = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Username :" + authen.getName());
        authen.getAuthorities().forEach(grantedAuthority -> System.out.println("Roles :" + grantedAuthority.getAuthority()));
        try {
            return new ResponseDataSuccsess<>(HttpStatus.OK.value(),"Find user by name",userService.findByUserName(userName));
        } catch (Exception e) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value() , e.getMessage());

        }
}
}

package com.example.demo.controller;

import com.example.demo.dto.request.RolesRequest;
import com.example.demo.dto.request.ShopMenuRequest;
import com.example.demo.dto.response.ResponseDataSuccsess;
import com.example.demo.service.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class RolesController {
    @Autowired
    RolesService rolesService;

    @PostMapping("addroles")
    public ResponseDataSuccsess<?> addrole(@RequestBody RolesRequest request) {
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "ADD Roles", rolesService.addRoles(request));
    }

    //@PreAuthorize("hasRole('USER')")
    @GetMapping("getallroles")
    public ResponseDataSuccsess<?> getallrole() {
        return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "List Roles", rolesService.rolesList());
    }
}


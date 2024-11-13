package com.example.demo.controller;

import com.example.demo.dto.request.AuthenticationRequest;
import com.example.demo.dto.response.AuthenticationResponse;
import com.example.demo.dto.response.ResponseDataSuccsess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class AuthenticationController {
    @Autowired
    AuthenticationResponse authenticationResponse;

    @PostMapping("log-in")
    ResponseDataSuccsess<?> authentication(@RequestBody AuthenticationRequest request) throws Exception {
        try {
            return new ResponseDataSuccsess<>(HttpStatus.OK.value(), "token", authenticationResponse.authentication(request));
        } catch (Exception e) {
            return new ResponseDataSuccsess<>(HttpStatus.BAD_REQUEST.value() , e.getMessage());
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<ResponseData> login(@RequestBody AuthenticationRequest request) throws Exception {
//        ResponseData responseData = new ResponseData();
//        try {
//            String token = authenticationResponse.authentication(request);
//            if (token != null) {
//                Map<String, String> result = new HashMap<>();
//                result.put("token", token);
//                responseData.setData(result);
//                responseData.setStatus(true);
//            }else{
//                responseData.setStatus(false);
//            }
//        }catch (Exception e) {
//            e.printStackTrace();
//            responseData.setStatus(false);
//        }
//        return ResponseEntity.ok(responseData);
//    }
}

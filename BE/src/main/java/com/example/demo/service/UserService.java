package com.example.demo.service;

import com.example.demo.dto.request.UserRequest;
import com.example.demo.model.Roles;
import com.example.demo.model.User;
import com.example.demo.repository.RolesRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    RolesRepository rolesRepository;

    public String addUser(UserRequest request) throws Exception {
        if (userRepository.existsByuserName(request.getUserName()))
            throw new Exception("Người dùng đã tồn tại");

        User user = User.builder()
                .userName(request.getUserName())
                .passWord(passwordEncoder.encode(request.getPassWord()))
                .fullName(request.getFullName())
                .build();
        user.setRoles(rolesRepository.findByroleName("USER"));

        userRepository.save(user);
        return user.getUserName();
    }

    public User findByUserName(String userName) throws Exception {
        return userRepository.findByuserName(userName).orElseThrow(() -> new Exception("Không tìm thấy người dùng"));

    }
}

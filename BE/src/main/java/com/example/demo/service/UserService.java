package com.example.demo.service;

import com.example.demo.dto.request.UserRequest;
import com.example.demo.dto.response.PageResponse;
import com.example.demo.model.User;
import com.example.demo.repository.RolesRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public PageResponse<?> getAllUser(int pageNo, int pageSize, String fullName ,String status) {
        if (pageNo > 0) {
            pageNo = pageNo - 1;
        }
        Pageable pageable = PageRequest.of(pageNo, pageSize);

        if (fullName == null && status == null) {
            Page<User> users = userRepository.findAll(pageable);
            List<User> userList = users.stream().map(user -> User.builder()
                    .userName(user.getUserName())
                    .fullName(user.getFullName())
                    .address(user.getAddress())
                    .status(user.getStatus())
                    .email(user.getEmail())
                    .roles(user.getRoles())
                    .build()).toList();
            return PageResponse.builder()
                    .pageNo(pageNo)
                    .pageSize(pageSize)
                    .totalPage(users.getTotalPages())
                    .data(userList)
                    .build();
        } else {
            Specification<User> spec = Specification.where((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("fullName"), "%" + fullName + "%"));
            Specification<User> hasStatus = Specification.where((root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("status"),  status ));
            spec.and(hasStatus);
            Page<User> users = userRepository.findAll(spec, pageable);
            List<User> userList = users.stream().map(user -> User.builder()
                    .userName(user.getUserName())
                    .fullName(user.getFullName())
                    .address(user.getAddress())
                    .status(user.getStatus())
                    .email(user.getEmail())
                    .roles(user.getRoles())
                    .build()).toList();
            return PageResponse.builder()
                    .pageNo(pageNo)
                    .pageSize(pageSize)
                    .totalPage(users.getTotalPages())
                    .data(userList)
                    .build();
        }
    }


    public User findByUserName(String userName) throws Exception {
        return userRepository.findByuserName(userName).orElseThrow(() -> new Exception("Không tìm thấy người dùng"));

    }
    public List<User> getUsersByRole(String roleName) {
        return userRepository.findByRolesRoleName(roleName);
    }
}

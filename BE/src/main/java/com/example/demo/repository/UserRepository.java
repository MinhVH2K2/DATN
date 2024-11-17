package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.*;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
   Optional<User>  findByuserName(String userName);

   boolean existsByuserName(String userName);

   List<User> findByRolesRoleName(String roleName);
}

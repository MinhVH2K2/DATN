package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String>, JpaSpecificationExecutor<User> {
   Optional<User>  findByuserName(String userName);

   boolean existsByuserName(String userName);


}

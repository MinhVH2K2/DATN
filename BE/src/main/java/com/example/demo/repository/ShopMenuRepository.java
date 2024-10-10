package com.example.demo.repository;

import com.example.demo.model.ShopMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShopMenuRepository extends JpaRepository<ShopMenu,String> {
    Optional<ShopMenu> findBymenuName(String menuName);
}

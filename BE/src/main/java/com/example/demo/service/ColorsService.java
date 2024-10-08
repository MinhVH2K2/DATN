package com.example.demo.service;

import com.example.demo.model.Colors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ColorsService {

    Page<Colors> getAll (Pageable pageable);
    Boolean createColors (Colors colors);
    Boolean updateColors (Colors colors );
    Boolean deleteColors (Long id );
    Optional<Colors> finbyId (Long id);

}

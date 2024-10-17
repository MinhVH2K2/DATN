package com.example.demo.service;

import com.example.demo.model.Marterial;
import com.example.demo.model.Sizes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface MarterialService {
    Page<Marterial> getAll(Pageable pageable);

    Boolean createMarterial(Marterial marterial);

    Boolean updateMarterial(Marterial marterial);

    Boolean deleteMarterial(Long id);

    Optional<Marterial> finbyId(Long id);
}

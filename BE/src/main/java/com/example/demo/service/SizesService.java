package com.example.demo.service;

import com.example.demo.model.Colors;
import com.example.demo.model.Sizes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface SizesService {

    Page<Sizes> getAll (Pageable pageable);
    Boolean createSizes (Sizes sizes);
    Boolean updateSizes (Sizes sizes );
    Boolean deleteSizes (Long id );
    Optional<Sizes> finbyId (Long id);
}

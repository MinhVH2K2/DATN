package com.example.demo.service.impl;

import com.example.demo.model.Colors;
import com.example.demo.model.Sizes;
import com.example.demo.repository.SizesRepository;
import com.example.demo.service.SizesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SizesServiceImpl implements SizesService {

    @Autowired
    private SizesRepository sizesRepository;

    @Override
    public Page<Sizes> getAll(Pageable pageable) {
        return sizesRepository.findAll(pageable);
    }

    @Override
    public Boolean createSizes(Sizes sizes) {
        try {
            Sizes sizes1 = Sizes.builder()
                    .sizesName(sizes.getSizesName())
                    .build();
            sizesRepository.save(sizes1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateSizes(Sizes sizes) {
        try {
            Sizes sizes1 = Sizes.builder()
                    .sizesId(sizes.getSizesId())
                    .sizesName(sizes.getSizesName())
                    .build();
            sizesRepository.save(sizes1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteSizes(Long id) {
        try {
            sizesRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;

        }
    }

    @Override
    public Optional<Sizes> finbyId(Long id) {
        return sizesRepository.findById(id);
    }
}

package com.example.demo.service.impl;

import com.example.demo.model.Colors;
import com.example.demo.repository.ColorsRepository;
import com.example.demo.service.ColorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class ColorsServiceImpl implements ColorsService {
    @Autowired
    private ColorsRepository colorsRepository;

//    @PreAuthorize("hasRole('USER')")

    @Override
    public Page<Colors> getAll(Pageable pageable) {
        return colorsRepository.findAll(pageable);
    }

    @Override
    public Boolean createColors(Colors colors) {
        int random = new Random().nextInt(10000);
        try {
            Colors colors1 = Colors.builder()
                    .colorCode("color" + random)
                    .corlorName(colors.getCorlorName())
                    .build();
            colorsRepository.save(colors1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public Boolean updateColors(Colors colors) {
        try {
            Colors colors1 = Colors.builder()
                    .colerId(colors.getColerId())
                    .colorCode(colors.getColorCode())
                    .corlorName(colors.getCorlorName())
                    .build();
            colorsRepository.save(colors1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteColors(Long id) {
        try {
            colorsRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;

        }
    }

    @Override
    public Optional<Colors> finbyId(Long id) {
        return colorsRepository.findById(id);
    }
}

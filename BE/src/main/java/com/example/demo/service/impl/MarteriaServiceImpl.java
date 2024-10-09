package com.example.demo.service.impl;

import com.example.demo.model.Marterial;
import com.example.demo.model.Sizes;
import com.example.demo.repository.MarteriaRepository;
import com.example.demo.repository.SizesRepository;
import com.example.demo.service.MarterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MarteriaServiceImpl implements MarterialService {

    @Autowired
    private MarteriaRepository marteriaRepository;

    @Override
    public Page<Marterial> getAll(Pageable pageable) {
        return marteriaRepository.findAll(pageable);
    }

    @Override
    public Boolean createMarterial(Marterial marterial) {
        try {
            Marterial marterial1 = Marterial.builder()
                    .materialName(marterial.getMaterialName())
                    .build();
            marteriaRepository.save(marterial1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean updateMarterial(Marterial marterial) {
        try {
            Marterial marterial1 = Marterial.builder()
                    .materialId(marterial.getMaterialId())
                    .materialName(marterial.getMaterialName())
                    .build();
            marteriaRepository.save(marterial1);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteMarterial(Long id) {
        try {
            marteriaRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;

        }
    }

    @Override
    public Optional<Marterial> finbyId(Long id) {
        return marteriaRepository.findById(id);
    }
}

package com.ucr.videogame_store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Office;
import com.ucr.videogame_store.repository.OfficeRepository;

@Service
public class OfficeService {
    @Autowired
    OfficeRepository officeRepository;

    public Office getOfficeById(Integer id){
        return officeRepository.findById(id).orElseThrow();
    }

    public List<Office> getAllOffices() {
        return officeRepository.getAllOfficesProcedure().get();
    }

    public void createOffice(Office office) {
        officeRepository.save(office);
    }
}

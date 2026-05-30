package com.ucr.videogame_store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Copy;
import com.ucr.videogame_store.repository.CopyRepository;

@Service
public class CopyService {
    @Autowired
    CopyRepository copyRepository;

    public void createCopy(Copy copy) {
        copyRepository.createCopyProcedure(copy.getSerialNumber(), copy.getOffice().getNumber(), copy.getCondition());
    }

    public List<Copy> getCopiesByOffice(Integer number) {
        return copyRepository.getAllCopiesByOfficeProcedure(number).get();
    }
}

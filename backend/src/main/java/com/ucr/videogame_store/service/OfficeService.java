package com.ucr.videogame_store.service;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.repository.OfficeRepository;

@Service
public class OfficeService {
    @Autowired
    OfficeRepository officeRepository;

    public @Nullable Object getAllOffices() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllOffices'");
    }

    public void createOffice() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createOffice'");
    }
}

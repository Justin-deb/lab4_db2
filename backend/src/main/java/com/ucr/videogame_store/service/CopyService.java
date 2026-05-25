package com.ucr.videogame_store.service;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.repository.CopyRepository;

@Service
public class CopyService {
    @Autowired
    CopyRepository copyRepository;

    public void createCopy() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createCopy'");
    }

    public @Nullable Object getCopiesByOffice(Integer number) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getCopiesByOffice'");
    }
}

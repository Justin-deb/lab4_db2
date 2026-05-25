package com.ucr.videogame_store.service;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Videogame;
import com.ucr.videogame_store.repository.VideogameRepository;

@Service
public class VideogameService {
    @Autowired
    VideogameRepository videogameRepository;

    public @Nullable Object getAllVideogames() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllVideogames'");
    }

    public void createVideogame(Videogame videogame) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createVideogame'");
    }
}

package com.ucr.videogame_store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Videogame;
import com.ucr.videogame_store.repository.VideogameRepository;

@Service
public class VideogameService {
    @Autowired
    VideogameRepository videogameRepository;

    public List<Videogame> getAllVideogames() {
        return videogameRepository.getAllVideogamesProcedure().get();
    }

    public List<Videogame> getAllVideogamesByOffice(int officeId){
        return videogameRepository.getVideogamesByOfficeProcedure(officeId).get();
    }

    public String createVideogame(Videogame videogame) {
        return videogameRepository.addVideogameProcedure(videogame.getCode(),
                                                            videogame.getName(),
                                                            videogame.getDescription(),
                                                            videogame.getDeveloper(),
                                                            videogame.getReleaseDate(),
                                                            videogame.getCategory().getId());
    }
}

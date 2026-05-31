package com.ucr.videogame_store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.dto.VideogameDTO;
import com.ucr.videogame_store.model.Videogame;
import com.ucr.videogame_store.repository.VideogameRepository;

@Service
public class VideogameService {
    @Autowired
    VideogameRepository videogameRepository;
    @Autowired
    CategoryService categoryService;

    public List<Videogame> getAllVideogames() {
        return videogameRepository.getAllVideogamesProcedure().get();
    }

    public List<Videogame> getAllVideogamesByOffice(int officeId){
        return videogameRepository.getVideogamesByOfficeProcedure(officeId).get();
    }

    public Videogame getVideogameById(Integer id){
        return videogameRepository.findById(id).orElseThrow();
    }

    public String createVideogame(Videogame videogame) {
        return videogameRepository.addVideogameProcedure(videogame.getCode(),
                                                            videogame.getName(),
                                                            videogame.getDescription(),
                                                            videogame.getDeveloper(),
                                                            videogame.getReleaseDate(),
                                                            videogame.getCategory().getId());
    }

    public List<VideogameDTO> videogameToDTO(List<Videogame> videogameList){
        List<VideogameDTO> videogameDTOlist = new ArrayList<VideogameDTO>();
        for (Videogame v : videogameList) {
            videogameDTOlist.add(new VideogameDTO(v.getCode(),
                                    v.getName(),
                                    v.getDescription(),
                                    v.getDeveloper(),
                                    v.getReleaseDate(),
                                    v.getCategory().getId()));
        }

        return videogameDTOlist; 
    }

    public List<Videogame> DtoToVideogame(List<VideogameDTO> videogameDtoList){
        List<Videogame> videogameList = new ArrayList<Videogame>();
        for (VideogameDTO v : videogameDtoList) {
            videogameList.add(new Videogame(v.getCode(),
                                v.getName(),
                                v.getDescription(),
                                v.getDeveloper(),
                                v.getReleaseDate(),
                                categoryService.getCategoryById(v.getCategoryId())));
        }
        return videogameList;
    }
}

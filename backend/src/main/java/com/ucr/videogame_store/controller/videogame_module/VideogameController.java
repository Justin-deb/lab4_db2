package com.ucr.videogame_store.controller.videogame_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.videogame_store.model.Videogame;
import com.ucr.videogame_store.service.VideogameService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/videogames")
public class VideogameController {
    @Autowired
    VideogameService videogameService;

    @GetMapping("/allVideogames")
    public ResponseEntity<?> getAllVideogames() {
        return ResponseEntity.status(HttpStatus.OK).body(videogameService.getAllVideogames());
    }

    @GetMapping("/videogamesOffice/{officeId}")
    public ResponseEntity<?> getAllVideogamesByOffice(@PathVariable String officeId) {
        return ResponseEntity.status(HttpStatus.OK).body(videogameService.getAllVideogamesByOffice(Integer.parseInt(officeId)));
    }
    

    @PostMapping("/create")
    public ResponseEntity<?> createVideogame(@RequestBody Videogame videogame) {
        try {
            videogameService.createVideogame(videogame);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
    
    
}

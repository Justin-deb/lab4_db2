package com.ucr.videogame_store.controller.videogame_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.videogame_store.dto.CopyDTO;
import com.ucr.videogame_store.service.CopyService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/copy")
public class CopyController {
    @Autowired
    CopyService copyService;

    @GetMapping("/copiesByOffice/{number}")
    public ResponseEntity<?> getCopiesByOffice(@RequestParam Integer number) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(copyService.getCopiesByOffice(number));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
    
    @PostMapping("/createCopy")
    public ResponseEntity<?> createCopy(@RequestBody CopyDTO copy) {
        try {
            copyService.createCopy(copy);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
}

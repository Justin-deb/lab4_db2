package com.ucr.videogame_store.controller.videogame_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.videogame_store.dto.TransferDTO;
import com.ucr.videogame_store.service.TransferService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/transfer")
public class TransferController {
    @Autowired
    TransferService transferService;

    @PostMapping("/transferGame")
    public ResponseEntity<?> createTransfer(@RequestBody TransferDTO transferDto) {
        try {
            transferService.createTransfer(transferDto);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
    
}

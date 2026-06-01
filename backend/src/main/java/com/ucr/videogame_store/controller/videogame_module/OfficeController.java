package com.ucr.videogame_store.controller.videogame_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.videogame_store.model.Office;
import com.ucr.videogame_store.service.OfficeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/office")
public class OfficeController {
    @Autowired
    OfficeService officeService;

    @GetMapping("/allOffices")
    public ResponseEntity<?> getAllOfices() {
        return ResponseEntity.status(HttpStatus.OK).body(officeService.getAllOffices());
    }

    @PostMapping("/createOffice")
    public ResponseEntity<?> createOffice(@RequestBody Office office) {
        try {
            Office createdOffice = officeService.createOffice(office);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOffice); // ✅ Retorna JSON
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

}

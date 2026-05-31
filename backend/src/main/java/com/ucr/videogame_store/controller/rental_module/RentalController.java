package com.ucr.videogame_store.controller.rental_module;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ucr.videogame_store.model.Rental;
import com.ucr.videogame_store.service.RentalService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/rental")
public class RentalController {
    @Autowired
    RentalService rentalService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getRentalByID(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(rentalService.getrentalById(Integer.parseInt(id)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    @GetMapping("/activeRentals/{id}")
    public ResponseEntity<?> getActiveRentals(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(rentalService.getActiveRentals(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    

    @GetMapping("/rentHistory/{id}")
    public ResponseEntity<?> getRentHistory(@PathVariable String id){
        return ResponseEntity.status(HttpStatus.OK).body(rentalService.getRentHistory(id));
    }
    
    @PostMapping("/rent")
    public ResponseEntity<?> rentVideogame(@RequestBody Rental rental) {
        try {
            rentalService.rentVideogame(rental);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<?> returnVideogame(@PathVariable String id,@RequestParam String details) {
        try {
            rentalService.returnVideogame(Integer.parseInt(id),details);
            
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
    
}

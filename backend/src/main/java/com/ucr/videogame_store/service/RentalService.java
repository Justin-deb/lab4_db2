package com.ucr.videogame_store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Rental;
import com.ucr.videogame_store.repository.RentalRepository;

@Service
public class RentalService {
    @Autowired
    RentalRepository rentalRepository;

    public void rentVideogame(Rental rental) {
        rentalRepository.createRentProcedure(rental.getClient().getId(),
                                                rental.getCopy().getVideoGame().getCode(),
                                                rental.getCopy().getOffice().getNumber(),
                                                rental.getDays());
    }

    public void returnVideogame(int id,String details) {
        rentalRepository.returnVideogame(id,details);
    }

    public List<Rental> getRentHistory(String id) {
        return rentalRepository.getActiveRentals(id).get();
    }
}

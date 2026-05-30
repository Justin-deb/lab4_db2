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

    public String rentVideogame(Rental rental) {
        return rentalRepository.createRentProcedure(rental.getClient().getId(),
                                                rental.getCopy().getVideoGame().getCode(),
                                                rental.getCopy().getOffice().getNumber(),
                                                rental.getDays());
    }

    public String returnVideogame(int id,String details) {
        return rentalRepository.returnVideogameProcedure(id,details);
    }

    public List<Rental> getActiveRentals(String id) {
        return rentalRepository.getActiveRentalsProcedure(id).get();
    }

    public List<Rental> getRentHistory(String id) {
        return rentalRepository.getAllRentalsProcedure(id).get();
    }
}

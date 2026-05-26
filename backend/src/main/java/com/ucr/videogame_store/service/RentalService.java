package com.ucr.videogame_store.service;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Rental;
import com.ucr.videogame_store.repository.RentalRepository;

@Service
public class RentalService {
    @Autowired
    RentalRepository rentalRepository;

    public void rentVideogame(Rental rental) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'rentVideogame'");
    }

    public void returnVideogame(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'returnVideogame'");
    }

    public @Nullable Object getRentHistory(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getRentHistory'");
    }
}

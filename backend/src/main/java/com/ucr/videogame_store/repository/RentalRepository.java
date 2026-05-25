package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucr.videogame_store.model.Rental;

public interface RentalRepository extends JpaRepository<Rental,Integer> {
    
}

package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucr.videogame_store.model.Office;

public interface OfficeRepository extends JpaRepository<Office,Integer>{
    
}

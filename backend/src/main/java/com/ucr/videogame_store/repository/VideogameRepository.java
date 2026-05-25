package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucr.videogame_store.model.Videogame;

public interface VideogameRepository extends JpaRepository<Videogame,Integer> {
    
}

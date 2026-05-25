package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Videogame;

@Repository
public interface VideogameRepository extends JpaRepository<Videogame,Integer> {
    
}

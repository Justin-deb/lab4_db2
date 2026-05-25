package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucr.videogame_store.model.Copy;

public interface CopyRepository extends JpaRepository<Copy,Integer> {
    
}

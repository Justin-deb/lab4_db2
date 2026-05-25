package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Copy;

@Repository
public interface CopyRepository extends JpaRepository<Copy,Integer> {
    
}

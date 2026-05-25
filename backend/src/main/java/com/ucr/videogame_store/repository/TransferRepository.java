package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Transfer;

@Repository
public interface TransferRepository extends JpaRepository<Transfer,Integer>{
    
}

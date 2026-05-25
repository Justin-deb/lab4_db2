package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ucr.videogame_store.model.Client;

public interface ClientRepository extends JpaRepository<Client,String> {
    
}

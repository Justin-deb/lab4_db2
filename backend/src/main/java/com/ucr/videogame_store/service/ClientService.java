package com.ucr.videogame_store.service;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;
}

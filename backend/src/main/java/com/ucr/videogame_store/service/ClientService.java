package com.ucr.videogame_store.service;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Client;
import com.ucr.videogame_store.repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;

    public @Nullable Object getAllClients() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllClients'");
    }

    public void createClient(Client client) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createClient'");
    }
}

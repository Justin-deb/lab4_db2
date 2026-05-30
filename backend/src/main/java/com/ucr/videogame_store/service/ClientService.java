package com.ucr.videogame_store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.model.Client;
import com.ucr.videogame_store.repository.ClientRepository;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.getAllClientsProcedure().get();
    }

    public void createClient(Client client) throws Exception {

        clientRepository.createClientProcedure(client.getId(),
                client.getName(),
                client.getLastName(),
                client.getPhoneNumber(),
                client.getEmail(),
                client.getAddress());

    }

    public Client getClientById(String id){
        return clientRepository.getClientByIdProcedure(id).orElseThrow();
    }
}

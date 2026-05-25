package com.ucr.videogame_store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.repository.TransferRepository;

@Service
public class TransferService {
    @Autowired
    TransferRepository transferRepository;
}

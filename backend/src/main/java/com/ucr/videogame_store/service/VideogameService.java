package com.ucr.videogame_store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.repository.VideogameRepository;

@Service
public class VideogameService {
    @Autowired
    VideogameRepository videogameRepository;
}

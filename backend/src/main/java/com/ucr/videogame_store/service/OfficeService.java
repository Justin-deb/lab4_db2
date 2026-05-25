package com.ucr.videogame_store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.repository.OfficeRepository;

@Service
public class OfficeService {
    @Autowired
    OfficeRepository officeRepository;
}

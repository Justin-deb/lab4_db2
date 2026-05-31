package com.ucr.videogame_store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ucr.videogame_store.dto.RentalDTO;
import com.ucr.videogame_store.model.Rental;
import com.ucr.videogame_store.repository.RentalRepository;

@Service
public class RentalService {
    @Autowired
    RentalRepository rentalRepository;
    @Autowired
    ClientService clientService;
    @Autowired
    CopyService copyService;

    public RentalDTO getrentalById(Integer id){
        Rental r = rentalRepository.findById(id).orElseThrow();
        RentalDTO rentalDto = new RentalDTO(r.getClient().getId(),
                                r.getCopy().getSerialNumber(),
                                r.getDays());
        return rentalDto;
    }

    @Transactional
    public String rentVideogame(RentalDTO rentalDto) {
        Rental rental = new Rental(clientService.getClientById(rentalDto.getClientId()),
                                        copyService.getCopyById(rentalDto.getCopyId()),
                                        rentalDto.getDays());
        return rentalRepository.createRentProcedure(rental.getClient().getId(),
                                                rental.getCopy().getVideoGame().getCode(),
                                                rental.getCopy().getOffice().getNumber(),
                                                rental.getDays());
    }

    @Transactional
    public String returnVideogame(int id,String details) {
        return rentalRepository.returnVideogameProcedure(id,details);
    }

    @Transactional
    public List<RentalDTO> getActiveRentals(String id) {
        return rentalToDTO(rentalRepository.getActiveRentalsProcedure(id).get());
    }

    @Transactional
    public List<RentalDTO> getRentHistory(String id) {
        return rentalToDTO(rentalRepository.getAllRentalsProcedure(id).get());
    }

    public List<RentalDTO> rentalToDTO(List<Rental> rentalList){
        List<RentalDTO> rentalDTOlist = new ArrayList<RentalDTO>();
        for (Rental r : rentalList) {
            rentalDTOlist.add(new RentalDTO(r.getClient().getId(),
                                r.getCopy().getSerialNumber(),
                                r.getDays()));
        }

        return rentalDTOlist; 
    }

    public List<Rental> DtoToRental(List<RentalDTO> rentalDtoList){
        List<Rental> rentalList = new ArrayList<Rental>();
        for (RentalDTO r : rentalDtoList) {
            rentalList.add(new Rental(clientService.getClientById(r.getClientId()),
                                        copyService.getCopyById(r.getCopyId()),
                                        r.getDays()));
        }
        return rentalList;
    }
}

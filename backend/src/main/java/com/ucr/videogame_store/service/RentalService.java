package com.ucr.videogame_store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Rental getrentalById(Integer id){
        return rentalRepository.findById(id).orElseThrow();
    }

    public String rentVideogame(Rental rental) {
        return rentalRepository.createRentProcedure(rental.getClient().getId(),
                                                rental.getCopy().getVideoGame().getCode(),
                                                rental.getCopy().getOffice().getNumber(),
                                                rental.getDays());
    }

    public String returnVideogame(int id,String details) {
        return rentalRepository.returnVideogameProcedure(id,details);
    }

    public List<Rental> getActiveRentals(String id) {
        return rentalRepository.getActiveRentalsProcedure(id).get();
    }

    public List<Rental> getRentHistory(String id) {
        return rentalRepository.getAllRentalsProcedure(id).get();
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

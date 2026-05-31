package com.ucr.videogame_store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.dto.CopyDTO;
import com.ucr.videogame_store.model.Copy;
import com.ucr.videogame_store.repository.CopyRepository;

@Service
public class CopyService {
    @Autowired
    CopyRepository copyRepository;
    @Autowired
    VideogameService videogameService;
    @Autowired
    OfficeService officeService;

    public Copy getCopyById(Integer id){
        return copyRepository.findById(id).orElseThrow();
    }

    public String createCopy(Copy copy) {
        return copyRepository.createCopyProcedure(copy.getSerialNumber(), copy.getOffice().getNumber(), copy.getCondition());
    }

    public List<Copy> getCopiesByOffice(Integer number) {
        return copyRepository.getAllCopiesByOfficeProcedure(number).get();
    }

    public List<CopyDTO> copyToDTO(List<Copy> copyList){
        List<CopyDTO> copyDTOlist = new ArrayList<CopyDTO>();
        for (Copy c : copyList) {
            copyDTOlist.add(new CopyDTO(c.getVideoGame().getCode(),
             c.getOffice().getNumber(),
             c.getAvailability(),
             c.getCondition()));
        }

        return copyDTOlist; 
    }

    public List<Copy> DtoToCopy(List<CopyDTO> copyDtoList){
        List<Copy> copyList = new ArrayList<Copy>();
        for (CopyDTO c : copyDtoList) {
            copyList.add(new Copy(videogameService.getVideogameById(c.getVideoGameId()),
                                    officeService.getOfficeById(c.getOfficeId()),
                                    c.getAvailability(),
                                    c.getCondition()));
        }
        return copyList;
    }
}

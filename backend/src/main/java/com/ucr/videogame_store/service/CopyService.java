package com.ucr.videogame_store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public String createCopy(CopyDTO copyDto) {
        Copy copy = new Copy(videogameService.getVideogameById(copyDto.getVideoGameId()),
                                    officeService.getOfficeById(copyDto.getOfficeId()),
                                    copyDto.getAvailability(),
                                    copyDto.getCondition());
        return copyRepository.createCopyProcedure(copyDto.getVideoGameId(), copy.getOffice().getNumber(), copy.getCondition());
    }

    @Transactional
    public List<CopyDTO> getCopiesByOffice(Integer number) {
        return copyToDTO(copyRepository.getAllCopiesByOfficeProcedure(number).get());
    }

    public List<CopyDTO> copyToDTO(List<Copy> copyList){
        List<CopyDTO> copyDTOlist = new ArrayList<CopyDTO>();
        for (Copy c : copyList) {
            copyDTOlist.add(new CopyDTO(
                c.getSerialNumber(),  // ✅ AGREGA ESTO
                c.getVideoGame().getCode(),
                c.getOffice().getNumber(),
                c.getAvailability(),
                c.getCondition()
            ));
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

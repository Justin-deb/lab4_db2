package com.ucr.videogame_store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ucr.videogame_store.dto.TransferDTO;
import com.ucr.videogame_store.model.Transfer;
import com.ucr.videogame_store.repository.TransferRepository;

@Service
public class TransferService {
    @Autowired
    TransferRepository transferRepository;
    @Autowired
    CopyService copyService;
    @Autowired
    OfficeService officeService;

    public String createTransfer(Transfer transfer) {
        return transferRepository.createTransferProcedure(transfer.getCopy().getSerialNumber(),
                                                            transfer.getDestinationOffice().getNumber(),
                                                            transfer.getComments());
    }

    public Transfer getTransferById(Integer id){
        return transferRepository.findById(id).orElseThrow();
    }

    public List<TransferDTO> transferToDTO(List<Transfer> transferList){
        List<TransferDTO> transferDTOlist = new ArrayList<TransferDTO>();
        for (Transfer t : transferList) {
            transferDTOlist.add(new TransferDTO(t.getCopy().getSerialNumber(),
             t.getOriginOffice().getNumber(),
             t.getDestinationOffice().getNumber(),
             t.getComments()));
        }

        return transferDTOlist; 
    }

    public List<Transfer> DtoToTransfer(List<TransferDTO> transferDtoList){
        List<Transfer> transferList = new ArrayList<Transfer>();
        for (TransferDTO t : transferDtoList) {
            transferList.add(new Transfer(copyService.getCopyById(t.getCopyId()),
                                    officeService.getOfficeById(t.getOriginOfficeId()),
                                    officeService.getOfficeById(t.getDestinationOfficeId()),
                                    t.getComments()));
        }
        return transferList;
    }
}

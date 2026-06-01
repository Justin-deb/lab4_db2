package com.ucr.videogame_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Transfer;

@Repository
public interface TransferRepository extends JpaRepository<Transfer,Integer>{
    @Procedure(procedureName = "sp_trasladar_copia")
    String createTransferProcedure(@Param("p_consecutivoCopia") int copyId,
                                @Param("p_sucursalDestino") int destinationOffice,
                                @Param("p_comentarios") String comments);
}

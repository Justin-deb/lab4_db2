package com.ucr.videogame_store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Copy;

@Repository
public interface CopyRepository extends JpaRepository<Copy,Integer> {
    @Procedure(procedureName = "sp_ingresar_copia")
    String createCopyProcedure(@Param("p_codigoVideojuego") int videogameId,
                            @Param("p_numeroSucursal") int officeId,
                            @Param("p_estado") String condition);
    
    @Procedure(procedureName = "sp_listar_copias_disponibles_por_sucursal")
    Optional<List<Copy>> getAllCopiesByOfficeProcedure(@Param("p_numeroSucursal") int officeId);
}

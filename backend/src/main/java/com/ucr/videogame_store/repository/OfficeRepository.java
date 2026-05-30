package com.ucr.videogame_store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Office;

@Repository
public interface OfficeRepository extends JpaRepository<Office,Integer>{
    @Procedure(procedureName = "sp_listar_sucursales")
    Optional<List<Office>> getAllOfficesProcedure();
}

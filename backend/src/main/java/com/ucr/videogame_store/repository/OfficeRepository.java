package com.ucr.videogame_store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Office;

@Repository
public interface OfficeRepository extends JpaRepository<Office,Integer>{
    @Query(value = "CALL sp_listar_sucursales()", nativeQuery = true)
    Optional<List<Office>> getAllOfficesProcedure();
}

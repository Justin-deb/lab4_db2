package com.ucr.videogame_store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Rental;

@Repository
public interface RentalRepository extends JpaRepository<Rental,Integer> {
    @Procedure(procedureName = "sp_ingresar_alquiler")
    String createRentProcedure(@Param("p_cedula") String clientId,
                            @Param("p_codigoVideojuego") int videogameId,
                            @Param("p_numeroSucursal") int officeId,
                            @Param("p_cantidadDias") int days);
                            
    @Procedure(procedureName = "sp_regresar_videojuego")
    String returnVideogameProcedure(@Param("p_secuenciaAlquiler") int rentId,@Param("p_detalle") String returnDetails);

    @Procedure(procedureName = "sp_listar_alquileres_activos_usuario")
    Optional<List<Rental>> getActiveRentalsProcedure(@Param("p_cedula") String clientId);

    @Procedure(procedureName = "sp_ver_historico_alquileres")
    Optional<List<Rental>> getAllRentalsProcedure(@Param("p_cedula") String id);
}

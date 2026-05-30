package com.ucr.videogame_store.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Videogame;

@Repository
public interface VideogameRepository extends JpaRepository<Videogame,Integer> {
    @Procedure(procedureName = "sp_listar_videojuegos_disponibles_por_sucursal")
    Optional<List<Videogame>> getVideogamesByOfficeProcedure(@Param("p_numeroSucursal") int officeId);

    @Procedure(procedureName = "sp_ingresar_videojuego")
    String addVideogameProcedure(@Param("p_codigo") int id,
                                    @Param("p_nombre") String name,
                                    @Param("p_descripcion") String description,
                                    @Param("p_desarrollador") String developer,
                                    @Param("p_fechaLanzamiento") LocalDate releaseDate,
                                    @Param("p_idCategoria") int categoryId);

    @Procedure(procedureName = "sp_listar_videojuegos")
    Optional<List<Videogame>> getAllVideogamesProcedure();
}

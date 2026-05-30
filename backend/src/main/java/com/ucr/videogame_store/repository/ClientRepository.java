package com.ucr.videogame_store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ucr.videogame_store.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client,String> {
    @Procedure(procedureName = "sp_listar_clientes")
    Optional<List<Client>> getAllClientsProcedure();

    @Procedure(procedureName = "sp_ingresar_cliente")
    String createClientProcedure(@Param("p_cedula") String id,
                                 @Param("p_nombre") String name,
                                 @Param("p_apellido") String lastName,
                                 @Param("p_telefono") String phoneNumber,
                                 @Param("p_correo") String email,
                                 @Param("p_direccion") String address);
}

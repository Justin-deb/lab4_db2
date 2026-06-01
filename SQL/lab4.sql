/*
	Laboratorio 4 Bases de datos 2
	Integrantes
	Mairon Barquero Salazar C4D016
	Carlos Rodriguez Delgado C4J084
	Justin Estrada Cruz C4E977
*/

CREATE SCHEMA IF NOT EXISTS VIDEO_CLUB DEFAULT CHARACTER SET utf8;

USE VIDEO_CLUB;

CREATE TABLE CLIENTE (
	Cedula CHAR(9) NOT NULL PRIMARY KEY,
	Nombre VARCHAR(20) NOT NULL,
	Apellido VARCHAR(20) NOT NULL,
	Telefono CHAR(8) NOT NULL,
	Correo VARCHAR(100),
	Direccion VARCHAR(255) NOT NULL,
	FechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS CATEGORIA (
	Id INT NOT NULL PRIMARY KEY,
	Nombre VARCHAR(20) NOT NULL,
	Detalle VARCHAR(100) NOT NULL
);

CREATE TABLE VIDEOJUEGO (
	Codigo INT NOT NULL PRIMARY KEY,
	Nombre VARCHAR(50) NOT NULL,
	Descripcion TEXT NOT NULL,
	Desarrollador VARCHAR(30) NOT NULL,
	FechaLanzamiento DATE NOT NULL,
	IdCategoria INT NOT NULL,
	CONSTRAINT VideojuegoCategoriaFK FOREIGN KEY (IdCategoria) REFERENCES CATEGORIA(Id)
);

CREATE TABLE SUCURSAL (
	Numero INT NOT NULL PRIMARY KEY,
	Nombre VARCHAR(30) NOT NULL
);

CREATE TABLE COPIA (
	Consecutivo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	CodigoVideojuego INT NOT NULL,
	NumeroSucursal INT NOT NULL,
	FechaIngreso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	Disponibilidad CHAR NOT NULL DEFAULT 'S' CHECK (Disponibilidad IN ('S', 'N')),
	Estado VARCHAR(200),
	CONSTRAINT CopiaSucursalFK FOREIGN KEY (NumeroSucursal) REFERENCES SUCURSAL(Numero),
	CONSTRAINT CopiaVideojuegoFK FOREIGN KEY (CodigoVideojuego) REFERENCES VIDEOJUEGO(Codigo)
);

CREATE TABLE ALQUILER (
	Secuencia INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	CedulaCliente CHAR(9) NOT NULL,
	ConsecutivoCopia INT NOT NULL,
	FechaPrestamo DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CantidadDias INT NOT NULL,
	FechaDevolucion DATETIME,
	DetalleDevolucion VARCHAR(200),
	CONSTRAINT AlquilerClienteFK FOREIGN KEY (CedulaCliente) REFERENCES CLIENTE(Cedula),
	CONSTRAINT AlquilerCopiaFK FOREIGN KEY (ConsecutivoCopia) REFERENCES COPIA(Consecutivo)
);

CREATE TABLE TRASLADO (
	NumeroOperacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	ConsecutivoCopia INT NOT NULL,
	FechaTraslado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	SucursalOrigen INT NOT NULL,
	SucursalDestino INT NOT NULL,
	Comentarios VARCHAR(100),
	CONSTRAINT TrasladoCopiaFK FOREIGN KEY (ConsecutivoCopia) REFERENCES COPIA(Consecutivo),
	CONSTRAINT TrasladoOrigenFK FOREIGN KEY (SucursalOrigen) REFERENCES SUCURSAL(Numero),
	CONSTRAINT TrasladoDestinoFK FOREIGN KEY (SucursalDestino) REFERENCES SUCURSAL(Numero)
);


DELIMITER //

/*
	MÓDULO 1: CLIENTES
*/

-- 1.1 Listar todos los clientes
DROP PROCEDURE IF EXISTS sp_listar_clientes// 
CREATE PROCEDURE sp_listar_clientes()
BEGIN
    SELECT 
        Cedula,
        Nombre,
        Apellido,
        Telefono,
        IFNULL(Correo, 'Sin correo')  AS Correo,
        Direccion,
        FechaRegistro
    FROM CLIENTE
    ORDER BY Apellido, Nombre;
END//


-- 1.2 Ingresar cliente
DROP PROCEDURE IF EXISTS sp_ingresar_cliente//
CREATE PROCEDURE sp_ingresar_cliente(
    IN p_cedula       CHAR(9),
    IN p_nombre       VARCHAR(20),
    IN p_apellido     VARCHAR(20),
    IN p_telefono     CHAR(8),
    IN p_correo       VARCHAR(100),
    IN p_direccion    VARCHAR(255),
    OUT p_mensaje     VARCHAR(200)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_mensaje = 'ERROR: No se pudo crear el cliente. Verifique los datos ingresados.';
    END;

    IF EXISTS (SELECT 1 FROM CLIENTE WHERE Cedula = p_cedula) THEN
        SET p_mensaje = 'ERROR: Ya existe un cliente registrado con esa cedula.';
    ELSE
        INSERT INTO CLIENTE (Cedula, Nombre, Apellido, Telefono, Correo, Direccion, FechaRegistro)
        VALUES (p_cedula, p_nombre, p_apellido, p_telefono, p_correo, p_direccion, NOW());
        SET p_mensaje = CONCAT('Cliente creado exitosamente. Cedula: ', p_cedula);
    END IF;
END//


/*
	MÓDULO 2: VIDEOJUEGOS
*/

-- 2.1 Listar todos los videojuegos
DROP PROCEDURE IF EXISTS sp_listar_videojuegos//
CREATE PROCEDURE sp_listar_videojuegos()
BEGIN
    SELECT 
        v.Codigo,
        v.Nombre,
        v.Descripcion,
        v.Desarrollador,
        v.FechaLanzamiento,
        v.IdCategoria
    FROM VIDEOJUEGO v
    INNER JOIN CATEGORIA c ON v.IdCategoria = c.Id
    ORDER BY v.Nombre;
END//


-- 2.2 Listar categorías (apoyo para ingresar videojuego)
DROP PROCEDURE IF EXISTS sp_listar_categorias//
CREATE PROCEDURE sp_listar_categorias()
BEGIN
    SELECT 
        Id,
        Nombre,
        Detalle
    FROM CATEGORIA
    ORDER BY Nombre;
END//


-- 2.3 Ingresar videojuego
DROP PROCEDURE IF EXISTS sp_ingresar_videojuego//
CREATE PROCEDURE sp_ingresar_videojuego(
    IN p_codigo           INT,
    IN p_nombre           VARCHAR(50),
    IN p_descripcion      TEXT,
    IN p_desarrollador    VARCHAR(30),
    IN p_fechaLanzamiento DATE,
    IN p_idCategoria      INT,
    OUT p_mensaje         VARCHAR(200)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_mensaje = 'ERROR: No se pudo registrar el videojuego. Verifique los datos ingresados.';
    END;

    IF EXISTS (SELECT 1 FROM VIDEOJUEGO WHERE Codigo = p_codigo) THEN
        SET p_mensaje = 'ERROR: Ya existe un videojuego con ese codigo.';
    ELSEIF NOT EXISTS (SELECT 1 FROM CATEGORIA WHERE Id = p_idCategoria) THEN
        SET p_mensaje = 'ERROR: La categoria seleccionada no existe.';
    ELSE
        INSERT INTO VIDEOJUEGO (Codigo, Nombre, Descripcion, Desarrollador, FechaLanzamiento, IdCategoria)
        VALUES (p_codigo, p_nombre, p_descripcion, p_desarrollador, p_fechaLanzamiento, p_idCategoria);
        SET p_mensaje = CONCAT('Videojuego "', p_nombre, '" creado exitosamente. Codigo: ', p_codigo);
    END IF;
END//


-- 2.4 Listar sucursales (apoyo para ingresar copia y traslados)
DROP PROCEDURE IF EXISTS sp_listar_sucursales//
CREATE PROCEDURE sp_listar_sucursales()
BEGIN
    SELECT 
        Numero,
        Nombre
    FROM SUCURSAL
    ORDER BY Numero;
END//


-- 2.5 Ingresar copia de videojuego
DROP PROCEDURE IF EXISTS sp_ingresar_copia//
CREATE PROCEDURE sp_ingresar_copia(
    IN p_codigoVideojuego INT,
    IN p_numeroSucursal   INT,
    IN p_estado           VARCHAR(200),
    OUT p_mensaje         VARCHAR(200)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_mensaje = 'ERROR: No se pudo registrar la copia. Verifique los datos ingresados.';
    END;

    IF NOT EXISTS (SELECT 1 FROM VIDEOJUEGO WHERE Codigo = p_codigoVideojuego) THEN
        SET p_mensaje = 'ERROR: El videojuego especificado no existe.';
    ELSEIF NOT EXISTS (SELECT 1 FROM SUCURSAL WHERE Numero = p_numeroSucursal) THEN
        SET p_mensaje = 'ERROR: La sucursal especificada no existe.';
    ELSE
        INSERT INTO COPIA (CodigoVideojuego, NumeroSucursal, FechaIngreso, Disponibilidad, Estado)
        VALUES (p_codigoVideojuego, p_numeroSucursal, NOW(), 'S', p_estado);
        SET p_mensaje = CONCAT('Copia registrada exitosamente. Consecutivo asignado: ', LAST_INSERT_ID());
    END IF;
END//


-- 2.6 Listar copias disponibles por sucursal (apoyo para traslado y alquiler)
DROP PROCEDURE IF EXISTS sp_listar_copias_disponibles_por_sucursal//
CREATE PROCEDURE sp_listar_copias_disponibles_por_sucursal(
    IN p_numeroSucursal INT
)
BEGIN
    SELECT 
        c.Consecutivo,
        c.CodigoVideojuego,
        c.Estado,
        c.Disponibilidad
    FROM COPIA c
    INNER JOIN VIDEOJUEGO v ON c.CodigoVideojuego = v.Codigo
    WHERE c.NumeroSucursal = p_numeroSucursal
      AND c.Disponibilidad = 'S'
    ORDER BY  c.Consecutivo;
END//


-- 2.7 Trasladar copia entre sucursales (con transacción y rollback)
DROP PROCEDURE IF EXISTS sp_trasladar_copia//
CREATE PROCEDURE sp_trasladar_copia(
    IN p_consecutivoCopia  INT,
    IN p_sucursalDestino   INT,
    IN p_comentarios       VARCHAR(100),
    OUT p_mensaje          VARCHAR(200)
)
BEGIN
    DECLARE v_sucursalOrigen INT DEFAULT NULL;
    DECLARE v_disponibilidad CHAR(1) DEFAULT NULL;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_mensaje = 'ERROR: No se pudo realizar el traslado. Se revirtieron los cambios.';
    END;

    SELECT NumeroSucursal, Disponibilidad
    INTO v_sucursalOrigen, v_disponibilidad
    FROM COPIA
    WHERE Consecutivo = p_consecutivoCopia;

    IF v_sucursalOrigen IS NULL THEN
        SET p_mensaje = 'ERROR: La copia especificada no existe.';
    ELSEIF v_disponibilidad <> 'S' THEN
        SET p_mensaje = 'ERROR: La copia no está disponible para traslado (actualmente alquilada).';
    ELSEIF v_sucursalOrigen = p_sucursalDestino THEN
        SET p_mensaje = 'ERROR: La sucursal destino no puede ser igual a la sucursal origen.';
    ELSEIF NOT EXISTS (SELECT 1 FROM SUCURSAL WHERE Numero = p_sucursalDestino) THEN
        SET p_mensaje = 'ERROR: La sucursal destino no existe.';
    ELSE
        START TRANSACTION;

        UPDATE COPIA
        SET NumeroSucursal = p_sucursalDestino
        WHERE Consecutivo = p_consecutivoCopia;

        INSERT INTO TRASLADO (ConsecutivoCopia, SucursalOrigen, SucursalDestino, FechaTraslado, Comentarios)
        VALUES (p_consecutivoCopia, v_sucursalOrigen, p_sucursalDestino, NOW(), p_comentarios);

        COMMIT;
        SET p_mensaje = CONCAT('Traslado realizado exitosamente. Copia ', p_consecutivoCopia,
                               ' trasladada de sucursal ', v_sucursalOrigen,
                               ' a sucursal ', p_sucursalDestino, '.');
    END IF;
END//


/*
	MÓDULO 3: ALQUILERES
*/

-- 3.1 Consultar datos de un cliente por cédula
DROP PROCEDURE IF EXISTS sp_consultar_cliente_por_cedula//
CREATE PROCEDURE sp_consultar_cliente_por_cedula(
    IN p_cedula CHAR(9)
)
BEGIN
    SELECT 
        Cedula,
        Nombre,
        Apellido,
        Telefono,
        IFNULL(Correo, 'Sin correo') AS Correo,
        Direccion,
        FechaRegistro
    FROM CLIENTE
    WHERE Cedula = p_cedula;
END//


-- 3.2 Listar videojuegos disponibles por sucursal
DROP PROCEDURE IF EXISTS sp_listar_videojuegos_disponibles_por_sucursal//
CREATE PROCEDURE sp_listar_videojuegos_disponibles_por_sucursal(
    IN p_numeroSucursal INT
)
BEGIN
    SELECT DISTINCT
        v.Codigo,
        v.Nombre,
        v.Descripcion,
        v.Desarrollador,
        v.IdCategoria
    FROM VIDEOJUEGO v
    INNER JOIN COPIA cp ON v.Codigo = cp.CodigoVideojuego
    INNER JOIN CATEGORIA c ON v.IdCategoria = c.Id
    WHERE cp.NumeroSucursal = p_numeroSucursal
      AND cp.Disponibilidad = 'S'
    GROUP BY v.Codigo, v.Nombre, v.Descripcion, v.Desarrollador, c.Nombre
    ORDER BY v.Nombre;
END//


-- 3.3 Ingresar alquiler
DROP PROCEDURE IF EXISTS sp_ingresar_alquiler//
CREATE PROCEDURE sp_ingresar_alquiler(
    IN p_cedula           CHAR(9),
    IN p_codigoVideojuego INT,
    IN p_numeroSucursal   INT,
    IN p_cantidadDias     INT,
    OUT p_mensaje         VARCHAR(200)
)
BEGIN
    DECLARE v_consecutivoCopia INT DEFAULT NULL;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_mensaje = 'ERROR: No se pudo registrar el alquiler. Se revirtieron los cambios.';
    END;

    IF NOT EXISTS (SELECT 1 FROM CLIENTE WHERE Cedula = p_cedula) THEN
        SET p_mensaje = 'ERROR: El cliente con esa cedula no existe.';
    ELSEIF NOT EXISTS (SELECT 1 FROM VIDEOJUEGO WHERE Codigo = p_codigoVideojuego) THEN
        SET p_mensaje = 'ERROR: El videojuego especificado no existe.';
    ELSEIF NOT EXISTS (SELECT 1 FROM SUCURSAL WHERE Numero = p_numeroSucursal) THEN
        SET p_mensaje = 'ERROR: La sucursal especificada no existe.';
    ELSEIF p_cantidadDias <= 0 THEN
        SET p_mensaje = 'ERROR: La cantidad de dias debe ser mayor a cero.';
    ELSE
        SELECT Consecutivo
        INTO v_consecutivoCopia
        FROM COPIA
        WHERE CodigoVideojuego = p_codigoVideojuego
          AND NumeroSucursal   = p_numeroSucursal
          AND Disponibilidad   = 'S'
        LIMIT 1;

        IF v_consecutivoCopia IS NULL THEN
            SET p_mensaje = 'ERROR: No hay copias disponibles de ese videojuego en la sucursal seleccionada.';
        ELSE
            START TRANSACTION;

            UPDATE COPIA
            SET Disponibilidad = 'N'
            WHERE Consecutivo = v_consecutivoCopia;

            INSERT INTO ALQUILER (CedulaCliente, ConsecutivoCopia, FechaPrestamo, CantidadDias,
                                  FechaDevolucion, DetalleDevolucion)
            VALUES (p_cedula, v_consecutivoCopia, NOW(), p_cantidadDias, NULL, NULL);

            COMMIT;
            SET p_mensaje = CONCAT('Alquiler registrado exitosamente. Secuencia asignada: ',
                                   LAST_INSERT_ID(), '. Copia asignada: ', v_consecutivoCopia);
        END IF;
    END IF;
END//


-- 3.4 Listar alquileres activos de un usuario (fecha devolución nula)
DROP PROCEDURE IF EXISTS sp_listar_alquileres_activos_usuario//
CREATE PROCEDURE sp_listar_alquileres_activos_usuario(
    IN p_cedula CHAR(9)
)
BEGIN
    SELECT 
        a.Secuencia,
        a.FechaPrestamo,
        a.CantidadDias,
        DATE_ADD(a.FechaPrestamo, INTERVAL a.CantidadDias DAY) AS FechaDevolucion,
        a.ConsecutivoCopia
    FROM ALQUILER a
    INNER JOIN COPIA      c ON a.ConsecutivoCopia = c.Consecutivo
    INNER JOIN VIDEOJUEGO v ON c.CodigoVideojuego = v.Codigo
    INNER JOIN SUCURSAL   s ON c.NumeroSucursal   = s.Numero
    WHERE a.CedulaCliente    = p_cedula
      AND a.FechaDevolucion IS NULL
    ORDER BY a.FechaPrestamo;
END//


-- 3.5 Regresar videojuego
DROP PROCEDURE IF EXISTS sp_regresar_videojuego//
CREATE PROCEDURE sp_regresar_videojuego(
    IN p_secuenciaAlquiler INT,
    IN p_detalle           VARCHAR(200),
    OUT p_mensaje          VARCHAR(200)
)
BEGIN
    DECLARE v_consecutivoCopia INT     DEFAULT NULL;
    DECLARE v_fechaPrestamo    DATETIME DEFAULT NULL;
    DECLARE v_cantidadDias     INT     DEFAULT NULL;
    DECLARE v_diasAtraso       INT     DEFAULT 0;
    DECLARE v_detalleActual    VARCHAR(200);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_mensaje = 'ERROR: No se pudo registrar la devolucion. Se revirtieron los cambios.';
    END;

    SELECT ConsecutivoCopia, FechaPrestamo, CantidadDias
    INTO v_consecutivoCopia, v_fechaPrestamo, v_cantidadDias
    FROM ALQUILER
    WHERE Secuencia = p_secuenciaAlquiler
      AND FechaDevolucion IS NULL;

    IF v_consecutivoCopia IS NULL THEN
        SET p_mensaje = 'ERROR: No se encontro un alquiler activo con esa secuencia.';
    ELSE
        SET v_diasAtraso = DATEDIFF(NOW(), DATE_ADD(v_fechaPrestamo, INTERVAL v_cantidadDias DAY));

        IF v_diasAtraso > 0 THEN
            SET v_detalleActual = CONCAT('ENTREGADO CON ', v_diasAtraso, ' DIA(S) DE ATRASO. ',
                                         IFNULL(p_detalle, ''));
            SET v_detalleActual = LEFT(v_detalleActual, 200);
        ELSE
            SET v_detalleActual = p_detalle;
        END IF;

        START TRANSACTION;

        UPDATE ALQUILER
        SET FechaDevolucion  = NOW(),
            DetalleDevolucion = v_detalleActual
        WHERE Secuencia = p_secuenciaAlquiler;

        UPDATE COPIA
        SET Disponibilidad = 'S'
        WHERE Consecutivo = v_consecutivoCopia;

        COMMIT;

        IF v_diasAtraso > 0 THEN
            SET p_mensaje = CONCAT('Videojuego devuelto con ', v_diasAtraso,
                                   ' día(s) de atraso. Alquiler #', p_secuenciaAlquiler, ' cerrado.');
        ELSE
            SET p_mensaje = CONCAT('Videojuego devuelto en tiempo. Alquiler #',
                                   p_secuenciaAlquiler, ' cerrado exitosamente.');
        END IF;
    END IF;
END//


-- 3.6 Ver histórico de alquileres de un usuario (activos y regresados)
DROP PROCEDURE IF EXISTS sp_ver_historico_alquileres//
CREATE PROCEDURE sp_ver_historico_alquileres(
    IN p_cedula CHAR(9)
)
BEGIN
    SELECT 
        a.Secuencia,
        a.FechaPrestamo,
        a.CantidadDias,
        a.FechaDevolucion,
        a.ConsecutivoCopia,
        IFNULL(a.DetalleDevolucion, '-')                      AS DetalleDevolucion
    FROM ALQUILER a
    INNER JOIN COPIA      c ON a.ConsecutivoCopia = c.Consecutivo
    INNER JOIN VIDEOJUEGO v ON c.CodigoVideojuego = v.Codigo
    WHERE a.CedulaCliente = p_cedula
    ORDER BY a.FechaPrestamo DESC;
END//


DELIMITER ;

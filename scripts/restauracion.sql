CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
create table if not exists evento
(
    id          bigserial
        constraint evento_pk
            primary key,
    nombre      varchar(200),
    descripcion text,
    lugar       varchar(200),
    ciudad      varchar(70),
    fecha       DATE,
    hora        time,
    categoria   jsonb,
    capacidad   integer,
    valor       float,
    ubicacion   point,
    estado      VARCHAR(20) default 'activo',
    visible     boolean default true,
    creado      timestamp default now(),
    actualizado timestamp,
    eliminado   timestamp
);

CREATE TABLE IF NOT EXISTS asistente (
     id BIGSERIAL PRIMARY KEY,
     identificacion VARCHAR(255) NOT NULL UNIQUE, -- Ajusta el tamaño según tus necesidades
     nombre VARCHAR(200) NOT NULL,
     direccion TEXT,
     telefono VARCHAR(20),
     correo VARCHAR(255) NOT NULL UNIQUE,
     categorias jsonb,
     ciudad VARCHAR(70),
     ubicacion POINT, -- Campo de tipo POINT para la ubicación
     creado TIMESTAMP DEFAULT NOW(),
     actualizado TIMESTAMP,
     eliminado TIMESTAMP
);

-- Índices recomendados
CREATE INDEX idx_asistente_identificacion ON asistente (identificacion); -- Para búsquedas por identificación
CREATE INDEX idx_asistente_nombre ON asistente (nombre); -- Para búsquedas por nombre (si es común)
CREATE INDEX idx_asistente_correo ON asistente (correo); -- Para búsquedas por correo electrónico
CREATE INDEX idx_asistente_ubicacion ON asistente USING GIST (ubicacion); -- Índice GiST para consultas espaciales eficientes en el campo 'ubicacion'


CREATE TABLE IF NOT EXISTS reserva (
   id BIGSERIAL PRIMARY KEY,
   asistente_id BIGINT NOT NULL REFERENCES asistente(id),
   evento_id BIGINT NOT NULL REFERENCES evento(id),
   fecha_reserva TIMESTAMP DEFAULT NOW(),
   cantidad_boletos INTEGER NOT NULL DEFAULT 1,
   estado VARCHAR(20) NOT NULL DEFAULT 'pendiente', -- Ej: 'pendiente', 'confirmada', 'cancelada'
   creado TIMESTAMP DEFAULT NOW(),
   actualizado TIMESTAMP,
   eliminado TIMESTAMP
);

-- Índices recomendados para la tabla 'reserva'
CREATE INDEX idx_reserva_asistente_id ON reserva (asistente_id);
CREATE INDEX idx_reserva_evento_id ON reserva (evento_id);
CREATE INDEX idx_reserva_fecha_reserva ON reserva (fecha_reserva);
CREATE INDEX idx_reserva_estado ON reserva (estado);


CREATE OR REPLACE FUNCTION verificar_capacidad_evento()
    RETURNS TRIGGER AS $$
DECLARE
    capacidad_evento INTEGER;
    boletos_reservados INTEGER;
BEGIN
    -- Obtener la capacidad del evento
    SELECT capacidad INTO capacidad_evento
    FROM evento
    WHERE id = NEW.evento_id;

    -- Calcular el total de boletos reservados para el evento
    SELECT COALESCE(SUM(cantidad_boletos), 0) INTO boletos_reservados
    FROM reserva
    WHERE evento_id = NEW.evento_id AND estado = 'confirmada';

    -- Verificar si se excede la capacidad
    IF (boletos_reservados + NEW.cantidad_boletos) > capacidad_evento THEN
        RAISE EXCEPTION 'No hay suficiente capacidad disponible para este evento.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_verificar_capacidad
    BEFORE INSERT ON reserva
    FOR EACH ROW
EXECUTE FUNCTION verificar_capacidad_evento();

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGSERIAL PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    clave TEXT NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    correo VARCHAR(255) UNIQUE,
    rol VARCHAR(50) NOT NULL DEFAULT 'usuario', -- 'usuario', 'administrador'
    creado TIMESTAMP DEFAULT NOW(),
    actualizado TIMESTAMP
);

CREATE INDEX idx_usuarios_usuario ON usuarios (usuario);
CREATE INDEX idx_usuarios_correo ON usuarios (correo);
CREATE INDEX idx_usuarios_estado ON usuarios (estado);

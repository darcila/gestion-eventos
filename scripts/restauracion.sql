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
    estado      VARCHAR(20),
    visible     boolean,
    creado      timestamp,
    actualizado timestamp,
    eliminado   timestamp
);

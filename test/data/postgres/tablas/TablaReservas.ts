import { IMemoryDb } from 'pg-mem';

export const tablaReservas = {
    crearTablaReservas: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE reserva (
                id SERIAL PRIMARY KEY,
                asistente_id integer,
                evento_id integer,
                facha_reserva timestamp,
                cantidad_boletos integer,
                estado TEXT,
                creado timestamp default current_timestamp,
                actualizado timestamp,
                eliminado timestamp
            )`);
    },
}

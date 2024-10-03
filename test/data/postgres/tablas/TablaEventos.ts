import { IMemoryDb } from 'pg-mem';

export const tablaEventos = {
    crearTablaEventos: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE evento (
                id SERIAL PRIMARY KEY,
                nombre TEXT,
                descripcion TEXT,
                lugar TEXT,
                ciudad TEXT,
                fecha DATE,
                hora TIME,
                categoria TEXT,
                capacidad INTEGER,
                valor FLOAT,
                ubicacion POINT,
                estado TEXT,
                creado timestamp default current_timestamp,
                actualizado timestamp,
                eliminado timestamp
            )`);
    },
};
